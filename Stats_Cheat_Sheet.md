# Stats Cheat Sheet

---

## 1. MEASURES OF CENTER (Central Tendency)

These answer: "What's a typical score?"

### Mean (The Average)
- **How:** Add all numbers together, divide by how many there are
- **Formula:** Mean = Sum of all scores ÷ Number of scores
- **Excel:** `=AVERAGE(A1:A10)`
- **Symbol:** Population = μ | Sample = M or X̄
- **Watch out:** Gets pulled by outliers (one millionaire in a room of minimum-wage workers makes the "average" income look insanely high)
- **If outliers exist → use Median instead**

### Median (The Middle)
- **How:** Put all numbers in order (smallest to biggest). Pick the one in the dead center.
- If you have an even number of values → average the two middle ones
- **Excel:** `=MEDIAN(A1:A10)`
- Example: 2, 4, 7 → Median = 4 | 2, 4, 7, 12 → Median = (4+7)/2 = 5.5

### Mode (The Most Popular)
- **How:** Whichever number (or category) shows up the most times
- **Excel:** `=MODE.SNGL(A1:A10)`
- If two values tie → "bimodal" (two modes)
- If nothing repeats → there is no mode
- **Mode is mostly for categories** (most common eye color, favorite food) — not super useful for regular numbers

### When to Use Which
- **Mean** → Default choice. Goes into statistical tests. Use when data is normal (no crazy outliers).
- **Median** → Use when there are outliers or skewed data (like home prices)
- **Mode** → Use for categories/labels (nominal data)

---

## 2. MEASURES OF SPREAD (Variability)

These answer: "How spread out are the scores?"

### Range
- **How:** Biggest number minus smallest number. That's it.
- **Excel:** `=MAX(A1:A10) - MIN(A1:A10)`

### IQR (Interquartile Range)
- **How:** Find the 75th percentile, find the 25th percentile, subtract them.
- This gives you the spread of the middle 50% of scores.
- **Excel:** `=QUARTILE(A1:A10, 3) - QUARTILE(A1:A10, 1)`

### Variance
- **How:** Take each score, subtract the mean, square it, then average all those squared differences.
- **Why square?** Some scores are above the mean (+) and some below (−). Squaring makes them all positive so they don't cancel out.
- **Formula:** Variance = Sum of (each score − mean)² ÷ N
- **Excel:** `=VAR.P(A1:A10)` (population) or `=VAR.S(A1:A10)` (sample, divides by N−1)

### Standard Deviation (SD) — THE BIG ONE
- **How:** Square root of the variance. Undoes the squaring so you're back in normal units.
- **What it tells you:** On average, how far do scores typically sit from the mean.
- **Formula:** SD = √Variance
- **Excel:** `=STDEV.P(A1:A10)` (population) or `=STDEV.S(A1:A10)` (sample)
- **Symbol:** Population = σ | Sample = s

**Example:** If class heights have Mean = 66.7 inches, SD = 3.65 → "On average, people's heights differ from 66.7 by about 3.65 inches"

---

## 3. DOING SD AND Z-SCORES STEP BY STEP

### By Hand (the logic):
1. Find the mean (add all scores ÷ how many)
2. Subtract the mean from each score → these are "deviations" (how far each score is from average)
3. Square each deviation (makes negatives positive)
4. Add up all the squared deviations → this is the "Sum of Squares" (SS)
5. Divide SS by N → this is the variance
6. Square root the variance → **this is the SD**
7. To get Z-scores: divide each deviation by the SD

### In Excel:
1. Mean: `=AVERAGE(range)`
2. **Copy the mean → Paste Special → Values** → drag down next to every score
3. Deviations: `=score - mean` → drag down
4. Squared deviations: `=deviation^2` → drag down **(these should NEVER be negative)**
5. SS: `=SUM(all squared deviations)`
6. Variance: `=SS / COUNT(range)`
7. SD: `=SQRT(variance)`
8. **Copy SD → Paste Special → Values** → drag down
9. Z-scores: `=deviation / SD` → drag down

**Why "Paste Special → Values"?** If you don't, when you drag the cell down, Excel changes what cell it's pointing to and gives you wrong numbers. Pasting as a value locks it.

**Shortcut (all-in-one Z-score):** `=(value - AVERAGE(range)) / STDEV.P(range)`

---

## 4. THE NORMAL DISTRIBUTION (Bell Curve)

### What it is:
When you measure stuff in the real world (heights, IQ, test scores), most people land near the average and fewer land at the extremes. This shape = bell curve = normal distribution.

### The shape:
```
     2.35% | 13.5% |  34%  |  34%  | 13.5% | 2.35%
   ________|_______|_______|_______|_______|________
  -3SD   -2SD   -1SD   MEAN   +1SD   +2SD   +3SD
```

### The numbers to know:

| Region | % of all scores |
|--------|----------------|
| Between −1 SD and +1 SD | **68%** (34% on each side of mean) |
| Between −2 SD and +2 SD | **95%** (add 13.5% on each side) |
| Between −3 SD and +3 SD | **99.7%** (add 2.35% on each side) |
| Above the mean | **50%** (always) |
| Below the mean | **50%** (always) |

### Key facts:
- Mean = Median = Mode (all the same, all at center)
- Symmetrical (left side mirrors right side)
- Tails never touch the x-axis (rare things can always happen)
- Defined by just 2 things: the mean and the SD

### How to find % in any region (by hand):
Just add up the bands. Examples:
- Between −1 SD and +2 SD → 34% + 34% + 13.5% = **81.5%**
- Below −2 SD → 50% − 34% − 13.5% = **2.5%**
- Above +1 SD → 50% − 34% = **16%**

### Excel (area between two Z-scores):
`=NORM.DIST(upper value, mean, sd, TRUE) - NORM.DIST(lower value, mean, sd, TRUE)`

---

## 5. Z-SCORES

### What they are:
A Z-score tells you how many standard deviations a score is from the mean.

### Formula:
**Z = (Score − Mean) ÷ SD**

### What the number means:
- Z = 0 → you ARE the mean
- Z = +1 → you're 1 SD above average
- Z = −1 → you're 1 SD below average
- Z = +2.5 → you're way above average (2.5 SDs above)
- Positive = above average | Negative = below average

### Why useful:
Z-scores put everything on the same scale. If one class measures height in inches and another in centimeters, convert both to Z-scores and you can compare them directly. Universal units.

### Z-distribution properties:
- Mean of all Z-scores = always 0
- SD of all Z-scores = always 1

### IQ Example (to practice):
IQ: Mean = 100, SD = 15

| SD units | −3 | −2 | −1 | 0 | +1 | +2 | +3 |
|----------|----|----|-----|---|-----|-----|-----|
| IQ score | 55 | 70 | 85 | **100** | 115 | 130 | 145 |

- IQ ≤ 70 → cognitively disabled (bottom 2.5%)
- IQ ≥ 130 → genius (top 2.5%)
- To convert: Score = Mean + (SD units × 15)

---

## 6. WHICH TEST DO I USE?

Read these questions top to bottom. Stop at the first one that matches.

**Q1: Am I just COUNTING things?** (how many dogs vs cats, how many people said yes vs no)
→ **Chi-Square** (you're comparing frequencies, not averages)

**Q2: Am I comparing one group to the WHOLE population it belongs to?** (New Jersey vs all US states)
→ Do I know the population's SD? → **Z-test**
→ Don't know the pop SD? → **Single Sample T-test**
→ If the problem doesn't mention it → assume you know it → **Z-test**

**Q3: Am I comparing 2 DIFFERENT groups?** (boys vs girls, states with a law vs states without)
→ **Independent T-test**

**Q4: Am I looking at the SAME group measured on 2 things?** (same people rating tacos AND pizza, same class at start AND end of semester)
→ **Dependent (Paired) T-test**

**Q5: Does it specify a direction?**
→ "Higher" / "more" / "faster" / "greater" = **One-tailed**
→ Just says "different" or "differ" = **Two-tailed**

### Quick Tricks:
- 1 measured thing compared ACROSS 2 groups = Independent
- 2 measured things FROM 1 group = Dependent
- Mentions "nationally" / "US average" / "all states" / "population" = probably Z-test

---

## 7. SIGNIFICANCE TESTING

### The question it answers:
"Could this result just be random luck, or is something actually going on?"

### The rule:
- **P < .05** → Significant (result would happen by chance less than 5% of the time)
- **P ≥ .05** → Not significant (could easily be random)

### Critical values (the threshold your test stat needs to beat):
- Two-tailed: **±1.96**
- One-tailed: **±1.645**

### Rule of thumb:
- T-value around **2 or bigger** → probably significant
- T-value around **1** → probably not significant

### What the test formula does (conceptual):
- **Top:** How different are the two groups? (Mean A − Mean B)
- **Bottom:** How noisy/messy is the data? (SDs ÷ √N for each group)
- Big difference on top ÷ small noise on bottom = big number = significant

### P-value reminders:
- P < .001 = very strong evidence | P < .01 = strong | P < .05 = meets threshold
- P-value is NOT "the chance my hypothesis is right"
- P-value IS "the chance of getting results this extreme if nothing were actually happening"
- "Fail to reject H0" does NOT mean "H0 is true" — just means not enough evidence

---

## 8. REPORTING RESULTS (APA Format)

### If significant:
> "Group A (M = 316, SD = 164) scored significantly higher than Group B (M = 134, SD = 83), t(49) = 10.49, p < .001, d = 1.22."

### If NOT significant:
> "No significant difference between groups, t(48) = 1.11, NS."

### What the parts mean:
- **t** = you did a t-test
- **(49)** = degrees of freedom
- **= 10.49** = your T-value (how many SDs from zero)
- **p < .001** = the p-value (how significant)
- **d = 1.22** = Cohen's d effect size
- **NS** = "Not Significant" — if not significant, you can stop here (no need to report p or d)

### Degrees of freedom:
- **Dependent T:** df = N − 1 (50 pairs → df = 49)
- **Independent T:** df = N − 2 (50 total scores, 2 groups → df = 48)

### If you get a negative T-value:
You just entered the smaller group first. Flip the sign to positive when reporting if you describe the larger group as larger.

---

## 9. TYPE I AND TYPE II ERRORS

### Type I Error (Alpha Error) — "False Alarm"
- **What happens:** You say "there's a difference!" but there actually isn't one.
- **Caused by:** Sample too big (inflated N makes tiny differences look significant), p-hacking
- **Real-world example:** Accusing an innocent person of a crime
- **Psych example:** Male sexual overperception bias (guy thinks girl is interested, she's not)

### Type II Error (Beta Error) — "Missed It"
- **What happens:** You say "nothing's going on" but there actually IS a real difference.
- **Caused by:** Sample too small (not enough data to detect the difference)
- **Real-world example:** Letting a guilty person go free
- **Psych example:** Female commitment skepticism bias (woman doesn't think guy is committed, but he is)

### How to catch errors — Effect Size:
- If your T-test says "significant!" but Cohen's d is tiny (< 0.10) → probably Type I error (inflated N faked it)
- If both T and d are big → you're good, it's real
- **Power = 1 − beta** = your study's ability to catch real differences. More people = more power.

---

## 10. EFFECT SIZE

### What it is:
How big the difference actually is — separate from whether it's "significant." Significance can be faked by huge samples. Effect size can't.

### Cohen's d (for T-tests):
- **Formula:** d = (Mean A − Mean B) ÷ pooled SD
- **No N in the formula** → sample size can't inflate it

| Size | Cohen's d | Correlation r |
|------|-----------|---------------|
| Small | 0.2 | 0.1 |
| Medium | 0.5 | 0.3 |
| Large | 0.8 | 0.5 |

### Effect size names by test:
- T-tests → Cohen's d
- One-way ANOVA → Eta (η)
- Factorial ANOVA → Eta squared (η²)

### Rule: Means and SDs should be proportional.
If the SD is way bigger than the mean → something's wrong (assumptions violated).

---

## 11. SCALES OF MEASUREMENT

| Scale | What it is | You can calculate | Examples |
|-------|-----------|-------------------|----------|
| **Nominal** | Just labels. No order at all. | Mode only | Eye color, gender, yes/no, car brand |
| **Ordinal** | Has order, but gaps between ranks aren't equal | Mode + Median | 1st/2nd/3rd place, rankings, Likert ≤6 pts |
| **Interval** | Equal gaps between values, but can go negative (zero isn't "nothing") | Mean + Median + Mode | Temperature °F, credit balance, golf score |
| **Ratio** | Equal gaps + true zero (can't go below 0) | Everything + ratios | Height, age, weight, money, # of things |

### How to figure out which one:
- Can it go below zero? → **Interval**
- Must be zero or higher? → **Ratio**
- Is there an order/ranking? → **Ordinal**
- Just names/categories? → **Nominal**

### Likert scale rule:
- 7+ response options → treat as metric (ratio if all positive, interval if has +/−)
- 6 or fewer options → ordinal (technically can't compute a valid mean)

### What tests need what:
- **Parametric tests** (Z, T, ANOVA, Correlation) → need interval or ratio data
- **Non-parametric** (Chi-Square) → just counting categories (nominal/ordinal)

---

## 12. HYPOTHESES

- **Null (H0):** "Nothing is happening. No difference. No relationship." Predicts **zero.**
- **Alternate (H1):** "Something IS happening." (This is what you're trying to support.)
- You never prove the alternate directly. You reject the null → which supports the alternate.
- **"Fail to reject H0"** ≠ "H0 is true." Just means you didn't find enough evidence.

### Directional vs Non-directional:
- "Girls are FASTER than boys" → directional → **one-tailed**
- "Girls and boys DIFFER in speed" → non-directional → **two-tailed**

---

## 13. SYMBOLS (Greek = Population, English = Sample)

| | Sample (your data) | Population (everything) |
|---|---|---|
| **Mean** | M or X̄ | μ (mu) |
| **SD** | s | σ (sigma) |

See Greek? → Population data. See regular letters? → Sample data.

---

## 14. T vs Z DISTRIBUTION

- **Z** = perfect bell curve. Use when you KNOW population SD (σ).
- **T** = same bell shape but with fatter tails. Use when you DON'T know σ.
- Small sample (10 people) → T has really fat tails → harder to get significant
- Big sample (100+) → T looks basically the same as Z
- More data → T approaches Z

---

## 15. DISTRIBUTIONS (Other Shapes)

- **Normal:** Symmetrical bell. Mean = Median = Mode. This is the default/goal.
- **Positively skewed:** Tail goes RIGHT. (Home prices — most normal, a few mansions pull it right)
- **Negatively skewed:** Tail goes LEFT.
- **Bimodal:** Two humps. **Trimodal:** Three humps.
- **Heavy tails:** Fat tails far from x-axis (more extreme scores than expected)
- **Light tails:** Skinny tails hugging x-axis (fewer extremes)
- **Can ONLY do probability math with normal distributions.** Skewed/bimodal = can't.

---

## 16. SPSS REFERENCE

- **Path:** Analyze → Compare Means → pick test
- **Dependent T** = SPSS calls it "Paired Samples T-Test"
- **Independent T** = put grouping variable in "Grouping Variable" → Define Groups (1, 2)
- **Always read the TOP row** (Equal variances assumed)
- Got a negative T? = You entered the smaller group first. No big deal.
- Check "Estimates of effect sizes" box

---

## 17. QUICK NUMBERS TO KNOW

| What | The Number |
|------|-----------|
| Significant threshold (P) | < .05 |
| Two-tailed critical value | ±1.96 |
| One-tailed critical value | ±1.645 |
| % within ±1 SD | 68% |
| % within ±2 SD | 95% |
| % within ±3 SD | 99.7% |
| Above/below mean | Always 50% each |
| Z distribution mean | Always 0 |
| Z distribution SD | Always 1 |
| IQ mean / SD | 100 / 15 |
| IQ disabled cutoff | ≤ 70 (2.5%) |
| IQ genius cutoff | ≥ 130 (2.5%) |
| Cohen's d minimum | ≥ 0.10 |
| df (dependent T) | N − 1 |
| df (independent T) | N − 2 |

---

## 18. THINGS THAT TRIP PEOPLE UP

1. **"Is it a Z-test?"** → Only if you're comparing one group to the whole population. If it's 2 separate groups (boys vs girls) → that's Independent T, not Z.

2. **"Why isn't it significant?"** → T-value is around 1 = only 1 SD from mean = super common = not rare = not significant.

3. **Negative T-value** → You just put the smaller group first. Not wrong. Flip it when reporting.

4. **Squared deviations are negative** → You messed up. Go back and re-square.

5. **Rating scales (1-5 Likert)** → Ordinal, NOT interval. Numbers don't make it metric. Exception: 7+ points.

6. **"On average"** → If a question could be about counting OR averaging, add "on average" to make it parametric. Without it → might be Chi-Square.

7. **"Death penalty vs homicide"** → You're NOT comparing death penalty to homicide. You're comparing homicide rates BETWEEN states that have vs don't have the death penalty.

8. **Sample vs population** → The sample is PART of the population. "NJ vs ALL states" includes NJ in the population.
