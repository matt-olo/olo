# Statistics Notes

---

## Measures of Central Tendency

Three measures: **Mean, Median, Mode**. Created to summarize lots of numbers into a single value our brains can understand.

### Mean (Arithmetic Mean)

- Most common measure of central tendency. **The one that gets plugged into statistical tests.**
- Also called the "arithmetic average." Technically all central tendency measures are types of averages, but "mean" = arithmetic average specifically.
- Population mean symbol = **μ** | Sample mean symbol = **M** or **X̄** (X-bar)
- Formula: μ = ΣX / N
- **Plain English:** Add up all the values, then divide by how many values there are
- **Excel:** `=AVERAGE(A1:A31)` — shortcut that does sum/count in one step
  - Long way: `=SUM(A1:A11)/COUNT(A1:A11)` (sum ÷ number of values)
- Example: 2, 4, 6, 2, 4 → sum = 18, N = 5, mean = 18/5 = 3.6
- If "mean" is used without specification, it refers to arithmetic mean (not geometric mean)
- **Weakness of the mean: OUTLIERS (extreme scores).** Extreme values pull the mean up or down, making it no longer representative. Example: average home price in a beach town = $1.4M because a few $50M+ houses pull the average up, even though most homes cost far less.
- **When outliers exist → use the MEDIAN instead.** That's why home sale data reports median price, not mean.
- Mean works fine when the distribution is **normal** (most values cluster around the middle, low/high values are rare)

### Median

- Midpoint of a distribution; equal number of scores above and below
- Same as the 50th percentile
- **Plain English:** Line up all values from lowest to highest, pick the one in the middle. If two middle numbers, average them.
- **Excel:** `=MEDIAN(A1:A31)`
- **Odd count:** middle number (e.g., 2, 4, 7 → median = 4)
- **Even count:** mean of two middle numbers (e.g., 2, 4, 7, 12 → (4+7)/2 = 5.5)
- When values repeat, use the formula for the 50th percentile
- **Use median over mean when there are extreme scores/outliers** (skewed distributions)

### Mode

- Most frequently occurring value
- **Plain English:** Whichever value shows up the most times in your data
- **Excel:** `=MODE(A1:A31)` or `=MODE.SNGL()` for single mode, `=MODE.MULT()` for multiple modes
  - If no value repeats → Excel returns "N/A" (no mode exists)
- Example: In TD passes data, mode = 18 (4 teams had 18, more than any other value)
- If two values tie for most frequent = **bimodal** (2 modes)
- **In statistics, mode is mostly used for categories, not numbers** — e.g., most common eye color (brown), most popular pizza place, favorite meal. It identifies the most frequently occurring case/category.
- With continuous data, mode is computed from a **grouped frequency distribution** (since no two scores are exactly alike)
- Mode = middle of the interval with the highest frequency (e.g., interval 600–700 has freq 6 → mode = 650)

### When to Use Which

| Measure | Best For | Weakness |
|---------|----------|----------|
| **Mean** | Most situations; plugs into statistical tests | Pulled by outliers/extreme scores |
| **Median** | When outliers exist (skewed data, e.g., home prices) | Doesn't use all data points |
| **Mode** | Categorical data (eye color, favorite food, etc.) | May not exist; less useful for numerical data |

### Key Excel Summary

| What | Formula |
|------|---------|
| Sum | `=SUM(range)` |
| Count | `=COUNT(range)` |
| Mean | `=AVERAGE(range)` |
| Median | `=MEDIAN(range)` |
| Mode | `=MODE.SNGL(range)` or `=MODE.MULT(range)` |

---

## Measures of Variability

Variability (also called spread or dispersion) = how "spread out" scores are. Two distributions can have the same mean but very different variability. Four measures: **Range, IQR, Variance, Standard Deviation**.

### Range

- Simplest measure of variability
- **Plain English:** Highest score minus lowest score
- **Excel:** `=MAX(range) - MIN(range)`
- Example: 10, 2, 5, 6, 7, 3, 4 → Range = 10 - 2 = 8

### Interquartile Range (IQR)

- Range of the **middle 50%** of scores
- **Plain English:** Find the 75th percentile and the 25th percentile, subtract them
- Formula: IQR = 75th percentile − 25th percentile
- **Excel:** `=QUARTILE(range, 3) - QUARTILE(range, 1)`
- 75th percentile = upper hinge; 25th percentile = lower hinge; IQR = H-spread
- **Semi-interquartile range** = IQR / 2. In a symmetric distribution, median ± semi-IQR contains half the scores.

### Variance

- How close scores are to the middle (mean) of the distribution
- **Plain English:** Average of the squared differences between each score and the mean. Squaring makes all deviations positive and penalizes big deviations more.
- **Key fact:** The mean of the raw deviations from the mean ALWAYS = 0 (that's why we square them)

**Population variance (σ²):**
- Formula: σ² = Σ(X − μ)² / N
- **Excel:** `=VAR.P(range)`
- Use when you have the entire population

**Sample variance (s²) — estimating population variance from a sample:**
- Formula: s² = Σ(X − M)² / (N − 1)
- **Excel:** `=VAR.S(range)`
- Divides by **N−1** (not N) because dividing by N underestimates the true population variance
- This is the formula used most often in practice

**Example:** Scores 1, 2, 4, 5 (sample)
- M = (1+2+4+5)/4 = 3
- s² = [(1−3)² + (2−3)² + (4−3)² + (5−3)²] / (4−1) = (4+1+1+4)/3 = 10/3 = 3.333

### Standard Deviation

- **Plain English:** Square root of the variance. Puts variability back into the original units (not squared). Tells you how far scores typically fall from the mean.
- Population SD symbol = **σ** | Sample SD symbol = **s**
- Formula: σ = √σ² or s = √s²
- **Excel:** `=STDEV.P(range)` for population | `=STDEV.S(range)` for sample

**Why it matters — the 68-95-99.7 rule (for normal distributions):**
- **68%** of scores fall within **1 SD** of the mean
- **95%** of scores fall within **2 SD** of the mean
- **99.7%** of scores fall within **3 SD** of the mean
- Example: Mean = 50, SD = 10 → 68% between 40–60, 95% between 30–70, 99.7% between 20–80

### Key Excel Summary — Variability

| What | Formula |
|------|---------|
| Range | `=MAX(range) - MIN(range)` |
| IQR | `=QUARTILE(range,3) - QUARTILE(range,1)` |
| Population Variance | `=VAR.P(range)` |
| Sample Variance | `=VAR.S(range)` |
| Population SD | `=STDEV.P(range)` |
| Sample SD | `=STDEV.S(range)` |

### Standard Deviation — Step-by-Step in Excel (Lecture Method)

The SD is the **average difference between each score and the mean.** Here's the manual process:

1. **Calculate the mean:** `=AVERAGE(range)` or `=SUM(range)/COUNT(range)`
2. **Paste the mean as a value** next to each score (Copy → Paste Special → Values, then drag down). This prevents Excel from changing the formula reference when dragging.
3. **Deviation scores:** `=raw score - mean` for each row, then drag down. These show how much each score differs from the mean.
4. **Squared deviations:** `=deviation^2` (caret `^` = "raised to the power of"). Eliminates negatives. Squared deviations can NEVER be negative — if they are, you did something wrong.
5. **Sum of squares (SS):** `=SUM(squared deviations)`. Adds up all squared deviations.
6. **Variance:** `=SS / COUNT(scores)` — divides by N to get the average squared deviation.
7. **Standard deviation:** `=SQRT(variance)` — takes the square root to undo the squaring and put it back in original units.

**Shortcut:** `=STDEV.P(range)` does all of this in one step.

**Key terminology:** Sum of Squares is abbreviated **SS** (Σ of squared deviations). The `=` sign in Excel tells it you're entering a function. The caret `^` (Shift+6) means "raised to the power of."

**What SD means in plain English:** "On average, scores differ from the mean by [SD value] units." Example: If heights have mean = 66.7 inches and SD = 3.65, then heights typically differ from 66.7 by about 3.65 inches.

**SD is a kind of average** — just like the mean is a kind of average (average of scores), SD is an average (average of how far scores are from the mean). Mean = measure of central tendency. SD = measure of variability. SD is the most powerful measure of variability because it uses ALL scores.

---

## Null Hypothesis & Alternate Hypothesis

- **Alternate Hypothesis:** Your research claim — a relationship EXISTS or a difference EXISTS between variables.
- **Null Hypothesis:** The opposite — NO relationship/difference; results are due to **random chance**.
- **Plain English:** Assume nothing is happening (null) until proven otherwise. "Innocent until proven guilty."
- You do NOT directly prove the alternate. You **refute (reject) the null hypothesis.**
- Null rejected → supports your alternate. Can't reject null → results may be random chance.
- Null = "no effect / no difference / no relationship." Alternate = "there IS one."
- You must assume the alternate is wrong until evidence says otherwise.
- **Numerically:** The null hypothesis always predicts **zero** (no difference between groups, zero correlation).
  - Example: Subtract women's height from men's height → null predicts = 0
  - On the normal distribution, null hypothesis value = 0 (the center/mean)
- **Other names for alternate hypothesis:** experimental hypothesis, research hypothesis, study hypothesis

### Directional vs Non-Directional Hypotheses

| Type | What It Says | Also Called |
|------|-------------|-------------|
| **Directional** | Specifies WHICH group is higher/lower, or direction of relationship (positive/negative) | One-tailed test |
| **Non-directional** | Says there IS a difference/relationship but doesn't specify which direction | Two-tailed test |

**Why "tailed"?**
- **One-tailed:** Predicting result falls in ONE specific tail of the distribution (e.g., positive side only)
- **Two-tailed:** Result could fall in EITHER tail (positive or negative)

**Examples:**
- Directional: "Men are taller than women" → one-tailed
- Non-directional: "There is a difference in height between men and women" → two-tailed
- Directional relationship: "There is a positive relationship between height and weight"
- Non-directional relationship: "There is a relationship between height and weight"

---

## Scales of Measurement (Levels of Measurement)

Two broad categories: **Metric** (Continuous) and **Non-Metric** (Categorical)

### Metric Variables (Continuous)

Measured on **equal interval scales** — the distance between any two adjacent points is exactly the same (like inches on a ruler: 2→3 same distance as 7→8).

| Type | Definition | Key Difference | Examples |
|------|-----------|----------------|----------|
| **Interval** | Equal intervals; can have positive AND negative values. No true zero point — zero is arbitrary, doesn't mean "absence of." | Can go negative; can't compute meaningful ratios (can't say "twice as hot") | Temperature (°F), golf scores (above/below par), credit card balance, grades (if penalties go below 0), sea level, rushing yards, goal differential in soccer |
| **Ratio** | Equal intervals + absolute zero point (zero = complete absence of quantity). Most informative scale — all lower scales rolled into one. | Has true zero; CAN compute ratios ("twice as much" is valid) | Height, weight, age, number of students, number of shoes, speed, income, ETA, songs on album, money in pocket, Kelvin temp, number of items recalled |

**Plain English:**
- **Interval** = equal spacing, but zero doesn't mean "nothing" and you can go negative. 0°F ≠ no temperature. Fahrenheit = interval, Kelvin = ratio.
- **Ratio** = equal spacing AND meaningful zero. Can't have negatives. Height can't be negative. 50¢ is genuinely twice 25¢.

**Why you can't compute ratios on interval:** If you shift where zero is on the scale, the ratio changes. 80°F is NOT "twice as hot" as 40°F — move zero and that ratio breaks.

### Non-Metric Variables (Categorical)

NOT on equal-interval scales. Just identify categories or types.

| Type | Definition | Key Feature | Examples |
|------|-----------|-------------|----------|
| **Nominal** (lowest level) | Categories that only identify differences; no order | Just names/labels; no ranking | Eye color, hair color, race, gender, skin tone, handedness, favorite color, religion, pizza places, football teams, car manufacturer, initials, speeding ticket (yes/no) |
| **Ordinal** | Categories with meaningful order/rank, but distances between ranks are NOT equal | Order matters; gaps unknown | Military/police ranks, birth order, race finish (1st/2nd/3rd), days of week, satisfaction scales, Netflix top 10, star ratings, movie rankings |

**Plain English:**
- **Nominal** = just labels. Things are DIFFERENT but no ranking. Brown eyes vs. blue eyes — neither is "more."
- **Ordinal** = has an order, but gaps aren't equal. 1st place vs. 2nd could be 0.5 seconds; 2nd vs. 3rd could be 8 minutes. You know ORDER but not DISTANCE.

### Key Distinctions

- Can it go negative? → **Interval.** Must be ≥ 0? → **Ratio.**
- Is there a rank/order? → **Ordinal.** Just categories? → **Nominal.**
- "Number of [things]" = almost always **Ratio**
- **Changing ordinal labels to numbers (1-4) does NOT make it interval** — the mental step from 1→2 isn't necessarily same as 3→4
- Psychological rating scales (pain, satisfaction, 5-point/7-point) = **Ordinal**
- Just because something uses numbers doesn't make it interval or ratio

### Tricky Cases

- **Number of items recalled:** Seems ratio (true zero). But recalling 1 extra easy item ≠ same ability as 1 extra hard item. Equal intervals may not hold psychologically.
- **Pain ratings 1-10:** Ordinal. Reducing pain 7→6 isn't guaranteed same relief as 3→2.

### Which Statistics Apply to Which Scale?

| Scale | Mean? | Median? | Mode? | Ratios? |
|-------|-------|---------|-------|---------|
| **Nominal** | NO (meaningless) | NO | YES | No |
| **Ordinal** | Debated (usually yes) | YES | YES | No |
| **Interval** | Yes | Yes | Yes | No |
| **Ratio** | Yes | Yes | Yes | Yes |

**Rule of thumb:**
- **Mean** = only numerical/metric variables (interval or ratio). Can't add up words.
- **Median** = only variables that can be ordered (ordinal, interval, ratio). Can't order nominal.
- **Mode** = ALL scale types including nominal. Just "most frequent."
- **Error to avoid:** Coding nominal as numbers (blue=1, red=2) then computing a mean → nonsense ("average favorite color is yellow")

**Examples:**
- Initials, car manufacturer, yes/no speeding ticket = **nominal** → mode only
- Birthday day of month, number of pets, number of cousins = **ratio** → mean, median, mode all apply

### Applying Measures — Clarifications from Lecture

- **Birthday (day of month):** Tricky — borderline. Different months have different numbers of days, so it loses meaning as an equal-interval measure. A hardcore statistician would say you can't compute a mean on it. Best classified as **ordinal** (you can tell order — born on 3rd is before 7th — but intervals aren't truly equal). Professor gave credit for birthday as ratio too, but the precise answer is ordinal.
- **Mode for metric/continuous data:** Technically you CAN compute a mode for numbers like pets/cousins, but it's not very meaningful. Mode was developed for categorical/non-metric data. For metric data, most values get left out — mode just tells you the single most frequent number.
- **SD applies to:** Only ratio (and interval) variables — pets and cousins. Not meaningful for nominal/ordinal.

### Likert Scale Rule (from lecture)

- **7+ response options, all positive values** → treat as **ratio**
- **7+ options with positive AND negative ends** → treat as **interval**
- **6 or fewer options** → treat as **ordinal** (non-metric) because it may no longer approximate normally distributed data. Can't validly compute means.
- Many researchers ignore this rule, but technically you shouldn't compute averages on scales with ≤6 points.

---

## Normal Distribution

### What It Is

- **Plain English:** When you measure things in the natural world (heights, weights, IQ, etc.), the data almost always follows the same pattern: most values cluster around the middle (the mean), and values become less and less frequent the farther you get from the mean. This pattern = normal distribution.
- Also called: **bell-shaped curve**, **bell curve**, **Gaussian curve** (after Karl Friedrich Gauss, though **Abraham de Moivre** first discovered it)
- Also called: **Z distribution** (standard deviation units = Z scores)
- **"Normal"** = what's typical/generally expected when measuring natural phenomena
- There are MANY normal distributions — they can differ in their means and standard deviations
- A normal distribution is **fully defined by just two parameters: μ (mean) and σ (standard deviation)**

### Key Properties (The 7 Features of Normal Distributions)

1. **Symmetrical** — both sides are mirror images
2. **Mean = Median = Mode** — all three at the exact center
3. **Total area under the curve = 1.0 (100%)**
4. **Denser in center, less dense in tails**
5. **Defined by two parameters:** μ (mean) and σ (standard deviation)
6. **68% within ±1 SD** of the mean
7. **~95% within ±2 SD** of the mean
- **Asymptotic** — tails NEVER touch x-axis (accounts for extremely rare events)

### The 68-95-99.7 Rule (Detail)

| Distance from Mean | % in Band (each side) | Cumulative |
|--------------------|----------------------|------------|
| ±1 SD | 34% each side | 68% total |
| ±2 SD | 13.5% each additional band | 95% total |
| ±3 SD | 2.35% each additional band | 99.7% total |

- **50% of scores above the mean, 50% below** (always — it's symmetrical)
- Scores beyond ±3 SD = extremely rare (0.3% total, split between both tails)

### Standard Deviation Units

- Mean = **0** SD from itself (by definition)
- +1 = one SD above mean | -1 = one SD below mean
- +2, +3, -2, -3 follow the same pattern

### Normal Distribution as a Probability Distribution

- Percentages = probability = area under the curve. All the same thing.
- Random person within 1 SD of mean? 68% probability.
- **Can't find probability of an EXACT value** — probability of any single point = 0. Must use a RANGE.
- Height of curve ≠ probability. **Area** under curve between two points = probability.
- The normal distribution is a **probability density function (PDF).**

### Key Differences: Normal vs Binomial

- **Binomial** = discrete (finite number of possible values, like a bar chart)
- **Normal** = continuous (defined over the entire real number line, -∞ to +∞). Any value is theoretically possible, even extremely unlikely ones.

### Central Limit Theorem (Why Normal Distribution Matters)

- **Plain English:** Add up many independent trials → the sum approaches a normal distribution, even if individual trials aren't normal.
- This is WHY it shows up everywhere in nature: most measurements = sum of many tiny independent factors.
- Example: Height = thousands of genetic + environmental factors combined → normally distributed.

### Effect of Changing Mean and SD

- **Changing the mean** → shifts the entire curve left or right (center moves)
- **Smaller SD** → narrower, taller curve (scores are closer to the mean)
- **Larger SD** → wider, flatter curve (scores are more spread out)

### Central Tendency vs. Normal Distribution (Exam Question)

- **Central tendency** = ONE summary number (mean/median/mode). Doesn't show full picture.
- **Normal distribution** = shows where ALL scores fall, how spread out, how far from mean. Universal measurement allowing cross-dataset comparison via Z-scores.

### Cumulative Distribution Function (CDF)

- CDF(x) = probability of getting ≤ x (all area to the LEFT of x)
- P(between A and B) = CDF(B) − CDF(A)
- This is what the Z-score calculator does behind the scenes.

### Excel: NORM.DIST Function

- `=NORM.DIST(x, mean, sd, TRUE)` → gives CDF (probability of getting ≤ x)
- `=NORM.DIST(x, mean, sd, FALSE)` → gives PDF height at x (not probability itself)
- To find P(between A and B): `=NORM.DIST(B, mean, sd, TRUE) - NORM.DIST(A, mean, sd, TRUE)`

### IQ Example (Raw Scores on Normal Distribution)

IQ is normed: **Mean (μ) = 100, SD = 15**

| SD Units | -3 | -2 | -1 | 0 (mean) | +1 | +2 | +3 |
|----------|-----|-----|-----|----------|-----|-----|-----|
| **IQ Score** | 55 | 70 | 85 | 100 | 115 | 130 | 145 |

- To convert: Raw score = Mean + (SD units × SD). Example: +2 SD = 100 + (2×15) = 130
- **70 and below** = cognitively disabled (technically 72, rounded to 70); qualifies for Social Security benefits. = 2.5% of population.
- **130 and above** = genius IQ. = 2.5% of population.
- **College students** tend to fall just below 115 and up.

### Calculating Percentages on the Distribution

- "What % of scores fall above the mean?" → Always **50%**
- "What % fall below the mean?" → Always **50%**
- "What % fall between -1 SD and +1 SD?" → **68%**
- "What % fall between 85 and 130 (IQ)?" = between -1 and +2 SD = 34% + 34% + 13.5% = **81.5%**
- To find % in a tail beyond a certain point: Start with 50%, subtract the known bands.
  - Example: % below -2 SD = 50% - 34% - 13.5% = **2.5%**

---

## Skewed & Non-Normal Distributions

- **Positively skewed:** Long tail trailing to the RIGHT (high end). Example: home prices in a beach town — most are normal, a few are $40M+ pulling the tail right.
- **Negatively skewed:** Long tail trailing to the LEFT (low end).
- **Bimodal:** Two peaks in frequency (two modes).
- **Trimodal:** Three peaks.
- **Key point:** You can ONLY make probability estimates from normally distributed data. Skewed/bimodal distributions can't be used for probability predictions.

---

## Z-Scores (Preview)

- The normal distribution is also called the **Z distribution**
- Standard deviation unit scores = **Z scores**
- Z score tells you how many standard deviations a score is from the mean

### Z-Score Formula

- **Formula:** Z = (X − M) / SD
  - X = the raw score
  - M = the mean
  - SD = the standard deviation
- **Plain English:** Take the score, subtract the mean, then divide by the standard deviation. This converts any raw score into "how many standard deviations away from the mean is it?"
- **Excel:** `=(raw score - mean) / standard deviation` — or since deviation scores = X − M already, just `=deviation score / SD`

### Z-Score Step-by-Step in Excel

Steps 1–7 are the same as SD calculation (see above), then add:

8. Paste SD as value, drag down next to all deviation scores
9. **Z score:** `=deviation score / SD` for each, drag down

**Key points:**
- Paste Special as Value for BOTH mean and SD before dragging
- Deviation scores = numerator of Z formula (X − M), so Z = just dividing them by SD

### What Z-Scores Mean

- Z = 0 → score IS the mean | Z = +1 → 1 SD above | Z = -1 → 1 SD below
- Positive = above mean | Negative = below mean
- **Universal comparison:** Converts any unit to SD units. Compare inches to centimeters by converting both to Z scores.

### Z-Score Distribution Properties

- Mean of Z scores = **always 0**
- SD of Z scores = **always 1**
- When using the Z calculator tool, you NEVER change the mean (0) or SD (1) — just plug in Z scores directly.

### Using the Z-Score Calculator (Online Tool)

The calculator finds the **percentage of scores (area under the curve)** in different parts of the normal distribution.

**Four options:**

| Option | What It Answers | When to Use |
|--------|----------------|-------------|
| **Below** | What % of scores are LOWER than this Z score? | "Lower than," "less than," "fewer than" |
| **Above** | What % of scores are HIGHER than this Z score? | "More than," "higher than," "greater than" |
| **Between** | What % of scores fall BETWEEN two Z scores? | "More than X but less than Y" |
| **Outside** | What % of scores are MORE EXTREME than two Z scores? | "More extreme than X and Y" |

**Rules:**
- **Lower Z score ALWAYS goes in the left/lower box** (even if the question mentions the higher one first)
- Leave mean = 0 and SD = 1 (don't change these when using Z scores)
- The answer is a decimal (e.g., 0.4202 = 42.02%)

**Examples from class:**
- "What % of states have police number lower than Florida?" → Use **Below**, paste Florida's Z score
- "What % have more police than Mississippi?" → Use **Above**, paste Mississippi's Z score
- "What % have more than Mississippi but less than New Jersey?" → Use **Between**, Mississippi (lower) on left, New Jersey (higher) on right
- "What % more extreme than New York or New Jersey?" → Use **Outside**, lower Z on left, higher Z on right

### Using the Z-Table (Standard Normal Distribution Table)

The Z-table gives the area from **0 to Z** (area between the mean and your Z score).

**How to read it:**
- Rows = first digit + tenths (e.g., 0.4)
- Columns = hundredths (e.g., 0.05)
- Together: row 0.4 + column 0.05 = Z of 0.45 → area = 0.1736 (17.36%)

**Key facts:**
- The table shows area from 0 (mean) to Z — NOT from -∞ to Z
- The curve is symmetrical, so **negative Z scores have the same area** as positive (e.g., -0.45 has same area as +0.45)
- Total area on one side of mean = 0.5000 (50%)

**How to use for different questions:**

| Question Type | How to Calculate |
|---------------|-----------------|
| Area between 0 and Z | Look up Z directly in table |
| Area between -Z and +Z (symmetric) | Look up Z, multiply by 2 |
| Area between -A and +B (asymmetric) | Look up A + look up B, add them |
| Area above Z | 0.5 − table value |
| Area below negative Z | 0.5 − table value |
| Area below positive Z | 0.5 + table value |

**Example:** % between Z = -1 and Z = +2
- From -1 to 0 = same as 0 to +1 = 0.3413
- From 0 to +2 = 0.4772
- Total = 0.3413 + 0.4772 = **0.8185 (81.85%)**

---

## Distribution Tail Weight

- **Normal distribution tails** = "Goldilocks zone" — not too heavy, not too light
- **Heavy tails** = tails are HIGH/FAR from the x-axis (more extreme scores than normal)
- **Light tails** = tails hug the x-axis (fewer extreme scores than normal)
- **No tails** = distribution drops straight down (looks like a rectangle/plateau)
- Be able to identify which distribution has heaviest tails, lightest tails, looks most normal, or has fewest extreme scores

---

## Other Quick Facts

- **Paper/pencil note-taking** performs almost **1 SD higher** than laptop/tablet note-taking (research finding)
- **IQ and criminality:** Lower IQ → more likely to commit "street crimes" (obvious crimes, getting caught). Higher IQ → more likely for white-collar crimes (embezzlement, complex fraud — requires cognitive ability). Very high IQ criminals may never get caught.
- **IQ and health/safety:** Higher IQ → less likely to sustain injuries, have accidents, or succumb to disease at young ages (better at recognizing risk).

---

## Sample vs Population Symbols

| | Sample | Population |
|---|--------|-----------|
| **Symbols look like** | Regular English letters | Greek letters |
| **Mean** | X̄ (X-bar) or M | μ (mu) |
| **Standard Deviation** | s | σ (sigma) |

- When you see Greek letters → population level data
- When you see regular letters → sample level data

---

## Z-Score vs T-Score

- **Z score formula:** Z = (X − μ) / σ → requires knowing POPULATION mean and POPULATION standard deviation
- **If you don't know population SD** (only have sample SD) → you're calculating a **T score**, not a Z score
- T scores use the T distribution instead of the Z (normal) distribution

---

## Inferential Statistics & Significance Testing

### Why We Need It

- Science wants **objectivity** — same results regardless of who does it
- Entire population measured → difference is just real, no stats needed
- We almost never have the entire population → collect samples → need inferential statistics to estimate if patterns are real vs. due to chance

### Significance Testing — The Core Logic

- Scientists decided (arbitrarily): if there's **less than 5% chance** results are due to random factors → it's **statistically significant**
- This 5% threshold uses the normal probability distribution
- **Two-tailed test:** Need to be in the extreme **2.5%** on either side (total 5% split across both tails)
- **One-tailed test:** All 5% on ONE tail

### Critical Values

| Test Type | Critical Value Needed |
|-----------|----------------------|
| **Two-tailed** | ≥ +1.96 or ≤ -1.96 |
| **One-tailed** | ≥ +1.645 or ≤ -1.645 |

- Your test statistic (from the formula) must exceed the critical value to be "statistically significant"
- **One-tailed tests are easier** to reach significance (lower critical value) — this is why scientists are accused of cheating if they use them

### Why One-Tailed Tests = Cheating

- Scientists do two-tailed → get 1.84 (not significant, needs 1.96) → change write-up to one-tailed after seeing data (1.84 > 1.645 = significant)
- So rampant that science now **defaults to two-tailed**. Real scientists don't use one-tailed.

### The Significance Test Formula (Conceptual)

**Numerator** (between-group differences): Mean of Group A − Mean of Group B

**Denominator** (within-group differences/error): SD of A / √N_A + SD of B / √N_B

- **Plain English:** Is the difference BETWEEN the groups bigger than the differences WITHIN the groups (accounting for sample size)?
- The result goes on the normal distribution to see if it's in the extreme 5%

### The Role of N (Sample Size)

- Bigger N → smaller denominator → bigger test statistic → easier to reach significance
- Good: More representative. Bad: Can FORCE significance on trivial differences.
- **Inflated N** = primary cause of **Type I (Alpha) error**

---

## Type I and Type II Errors

| | Type I (Alpha Error) | Type II (Beta Error) |
|---|---------------------|---------------------|
| **What happens** | You DETECT something that doesn't really exist | You FAIL TO DETECT something that really does exist |
| **Stats version** | You find "significant" results that aren't real | You miss real differences because test wasn't powerful enough |
| **Cause** | Inflated N, one-tailed cheating | Too small N (low statistical power) |
| **Psychology example** | Male sexual overperception bias (men think women are interested when they're not) | Female commitment skepticism bias (women underestimate men's commitment) |
| **CJ example** | Accusing an innocent person of being guilty | Letting a guilty person go free |
| **General example** | Thinking your partner loves you when they don't | Not realizing your partner loves you when they do |

### Effect Size — The Correction for Type I Error

- **Formula:** Effect size (Cohen's d) = (Mean A − Mean B) / pooled SD — **no N involved!**
- **Plain English:** How big is the difference in standard deviation units, without sample size inflating it?
- Rule: Want **≥ 0.10** to consider something might be real
- Significance huge + effect size tiny → likely **Type I error**
- Significance huge + effect size large → real finding
- Some journals now only want effect sizes (no significance testing)

---

## Types of Statistical Tests

### Z-Test

- Compares a **sample mean to a population mean**
- Requires: population mean (μ) AND population standard deviation (σ)
- Formula: Z = (Sample mean − Population mean) / (σ / √N)
- Example: Is Wisconsin's homicide rate different from the US average?
- Uses the **Z (normal) distribution**

### Single Sample T-Test

- Same as Z-test but you **don't know population SD** — substitute sample SD instead
- Uses the **T distribution** (not normal/Z distribution)
- T distribution has **heavier tails** than normal distribution (especially with small N)
- As N increases, T distribution approaches normal distribution
- Critical values are HIGHER for T-tests (harder to reach significance with small N)

### Independent Samples T-Test

- Compares means from **2 separate/unrelated groups**
- Example: Boys' running speed vs. girls' running speed
- Groups are independently drawn, not matched
- Has **2 sources of within-group variance** (SD for each group)
- Uses T distribution

### Dependent (Paired) Samples T-Test

- Compares means from the **same people measured twice** (or matched pairs)
- Example: Your Homework 1 score vs. your Homework 2 score
- Only **1 source of within-group variance** (because same people = same characteristics both times)
- **Easier to get significant results** than independent samples T-test (smaller denominator)
- Fewer sources of variability = individual differences are controlled

### Error Variance

- Also called **within-group variance** or **individual difference factors**
- Sources of variability NOT accounted for by your data
- Examples: study habits, background knowledge, age, prior experience
- Fewer in dependent designs (comparing people to themselves) than independent designs (comparing different groups)

### Summary of Tests

| Test | Compares | Requires | Distribution Used |
|------|----------|----------|-------------------|
| **Z-test** | Sample mean vs. population mean | Population μ AND σ | Z (normal) |
| **Single sample T-test** | Sample mean vs. population mean | Population μ only (use sample s) | T distribution |
| **Independent samples T-test** | 2 separate group means | Neither population parameter | T distribution |
| **Dependent samples T-test** | Same group measured twice | Neither population parameter | T distribution |

### T-Distribution Key Facts

- Has heavier tails than normal distribution (especially with small N)
- Small N (e.g., 10) → very heavy tails → critical values much higher than 1.96
- As N increases → T distribution approaches normal distribution
- N ≈ 100+ → T distribution is practically identical to Z distribution
- Small N → harder to detect real differences (more likely Type II error)

---

## How to Identify Which Test to Use (Decision Rules)

### The Key Questions to Ask:

1. **Are you comparing a sample to a population?** → Z-test or Single Sample T-test
   - Know population SD (σ)? → **Z-test**
   - Don't know population SD? → **Single Sample T-test**
   - If not specified that you don't know σ → assume you DO know it → Z-test

2. **Are you comparing 2 different/unrelated groups?** → **Independent Samples T-test**
   - Examples: boys vs girls, dogs vs cats, track runners vs wrestlers, Eagles vs Chiefs

3. **Are you comparing the same group measured twice (or rating 2 things)?** → **Dependent (Paired) Samples T-test**
   - Examples: same students' grades at beginning vs end, same people rating tacos AND pizza, same team's performance in 2 different seasons

4. **Are you just counting things (frequencies, not averages)?** → **Chi-Square** (non-parametric, covered later)
   - Examples: number of dogs vs cats at park, number of students who prefer tacos vs pizza, number of men vs women in class

### One-Tailed vs Two-Tailed:

- **One-tailed:** Hypothesis specifies a DIRECTION (more, less, higher, faster, etc.)
- **Two-tailed:** Hypothesis just says "different" or "differ" without specifying which is more/less

### Key Rules for Writing Hypotheses:

- **Z-test/Single Sample T:** Compare a sample TO THE POPULATION IT COMES FROM (including itself). NOT "versus the rest" — always versus ALL.
  - ✅ "New Jersey's DUI rate compared to all states in the US"
  - ❌ "New Jersey's DUI rate compared to other states" (excludes NJ)
- **Include "on average" or "average"** in parametric test hypotheses so it's clear you're computing means, not just counting frequencies
- **Specify the group** for dependent T-tests (e.g., "Stockton students" not just "students")
- If it doesn't specify you don't know population SD → default to **Z-test**
- If it says "don't know population SD/variance/variability" → **Single Sample T-test**

### Common Mistakes:

- Comparing 2 different groups (boys vs girls) is NOT a Z-test → it's Independent T-test
- Same group rating 2 things (rate dogs AND rate cats) = Dependent, not Independent
- "More dogs than cats at the park" = frequency (Chi-Square), NOT a T-test (unless you add "on average day")
- Z-test and Single Sample T-test do the EXACT same thing — only difference is whether you know population SD

### Parametric vs Non-Parametric Tests

| | Parametric | Non-Parametric |
|---|-----------|---------------|
| **Involves** | Computing averages/means | Comparing frequencies (counting) |
| **Foundation** | General Linear Model (linear relationships) | — |
| **Tests** | Z-test, T-tests (all types), ANOVA, Correlation, Regression | Chi-Square (χ²) |
| **Key rule** | All involve calculating a mean somewhere | Just counting things up |

### P < .05 Notation

- When a result exceeds the critical value (1.96 for two-tailed) → it falls in the extreme 5% of the distribution
- This is notated as **P < .05** (probability less than 5% that result is due to chance)
- The higher the test statistic beyond 1.96, the LOWER the P-value (more extreme = less likely to be chance)
- P < .01 = even more significant (extreme 1%)
- A score of 3, 4, 5+ → extremely unlikely to be chance → very low P-value

### SPSS Note

- In this class, calculations are done in **SPSS** (mandated by CJ department)
- SPSS calls dependent T-test → **"Paired Samples T-test"** (same thing, different name)

### Running T-Tests in SPSS

**Path:** Analyze → Compare Means → choose test type

**Dependent (Paired Samples) T-Test in SPSS:**
1. Analyze → Compare Means → Paired Samples T-Test
2. Put the variable you hypothesize is LARGER as Variable 1, smaller as Variable 2
3. Make sure "Estimates of effect sizes" is checked
4. Click OK
5. If you get a NEGATIVE T value → it means you put them in backwards (Variable 2 is actually larger)

**Independent Samples T-Test in SPSS:**
1. Analyze → Compare Means → Independent Samples T-Test
2. Put your grouping variable (independent variable, e.g., "3strikes") in the "Grouping Variable" box
3. Click "Define Groups" → SPSS detects the codes (1 and 2) → Continue
4. Put your measured/test variable (dependent variable, e.g., "assault") in the "Test Variable" box
5. Make sure effect sizes checked → Click OK
6. **Always read the TOP row** ("Equal variances assumed") — ignore the bottom row unless dealing with tiny data

### How to Report T-Test Results

**If SIGNIFICANT:**

Plain English + means/SDs + APA format:

> "Average assault rates are significantly higher than average robbery rates in the US (M = 316.98, SD = 164.56) compared to robbery (M = 133.98, SD = 83.45), t(49) = 10.49, p < .001, d = 1.22."

**Format:** t(degrees of freedom) = T-value, p = P-value, d = Cohen's d

**If NOT SIGNIFICANT:**

> "There are no significant differences in assault rates between states with three strikes laws (M = 343.69, SD = 192.22) and states without (M = 291.50, SD = 137.09), t(48) = 1.109, NS."

- **NS** = "Not Significant" — you don't need to report the exact p-value or Cohen's d if not significant (convention)
- But you wouldn't lose points for including them

### Degrees of Freedom (df)

- **Dependent T-test:** df = N − 1 (N = number of pairs). Example: 50 pairs → df = 49
- **Independent T-test:** df = N − 2 (N = total scores, subtract 1 for each group). Example: 50 total, 2 groups → df = 48
- **General rule:** df = total observations minus number of groups being compared

### Independent vs Dependent Variables in T-Tests

- **Independent variable** = grouping variable (nominal or ordinal) — tells you the groups being compared
  - Examples: 3 strikes laws (yes/no), death penalty (yes/no), region, gun control
  - Coded as 1 = yes, 2 = no (typically)
- **Dependent variable** = measured/test variable (interval or ratio/metric) — what you're calculating means of
  - Examples: murder rate, robbery, assault, police number, population

### Key Rules for Identifying Test Type (with SPSS Lab Examples)

**It's DEPENDENT (Paired) if:**
- 2 different measured variables from the SAME source/group
- "Is the white prison population higher than the Black prison population?" → same source (US), 2 measures = dependent
- "Are violent crimes more prevalent than property crimes?" → same group, 2 measures = dependent
- "Are more people on probation or parole?" → same group, 2 measures = dependent
- "Eagles players rate tacos as yummier than pizza" → same group rating 2 things = dependent (one-tailed)
- "Midwest people rate appeal of dogs and cats differently" → same group, 2 ratings = dependent (two-tailed)

**It's INDEPENDENT if:**
- You're comparing the SAME measured variable between 2 DIFFERENT groups (created by an independent variable)
- "Do death penalty laws affect homicide rates?" → 2 groups (with/without), 1 measure = independent
- "Do car theft rates differ between region 1 and region 2?" → 2 groups, 1 measure = independent
- "Are 3 strikes laws related to rape rates?" → 2 groups, 1 measure = independent
- "Dogs have more olfactory acuity than cats" → 2 groups, 1 measure = independent (one-tailed)
- "Squirrels gather more acorns than chipmunks" → 2 groups, 1 measure = independent (one-tailed)
- "Pigeons have different flight speed than Goshawks" → 2 groups, 1 measure = independent (two-tailed)

**It's a Z-TEST if:**
- Comparing a sample to the POPULATION it comes from (including itself)
- "2025 Eagles lost more games than all Eagles teams in history" → sample vs population = Z-test (one-tailed)

**Common mistake:** "Death penalty laws vs homicide rates" ≠ comparing 2 things. You're comparing homicide rates BETWEEN states that have vs don't have death penalty laws.

### Interpreting SPSS Output

- **T value:** How many SDs away from the mean. Want ≥ 2 (approximately) for significance with moderate samples.
- **Sig. (2-tailed):** This is your p-value. Must be < .05 to be significant.
- **Cohen's d (point estimate):** Effect size. Report as positive if you describe which group is larger in plain English.
- **Negative T value:** Just means you entered the smaller group first. Flip the sign when reporting if you describe the larger as larger.
- If significance = huge but Cohen's d is tiny (like 0.02) → possible **Type I error**
- If both are proportional → trustworthy finding
- **Worry about Type I error when Cohen's d ≤ 0.10** with a very significant T-value

### Means and SDs Should Be Proportional

- In a well-behaved T-test, the mean should be LARGER than the SD for each group
- If SD is much larger than the mean → assumptions of the T-test may be violated

### Effect Size Names by Test Type

| Test | Effect Size Measure |
|------|-------------------|
| T-tests | Cohen's d |
| One-way ANOVA | Eta (η) |
| Factorial ANOVA | Eta squared (η²) |

### Exam Notes (from professor)

- Exam is open to **personal handwritten notes ONLY** — not internet, not AI, not textbooks, not photocopies of others' notes
- Can use Excel and the Z-score calculator tool on computer
- Questions can be open-ended, identifying tests, calculations, or conceptual
- Between "one and a thousand" questions (professor's joke — but can easily complete in time)

---

## Quick Reference & Shortcuts

### Test Selection Logic

- **Count the groups.** 1 group vs population = Z or Single Sample T. 2 different groups = Independent T. Same group twice = Dependent T. Just counting stuff = Chi-Square.
- **Count the measured variables.** 1 measured variable compared across 2 groups = Independent. 2 measured variables from 1 group = Dependent.
- If the question mentions "nationally," "US average," "all states," "population" = probably **Z-test** (sample vs population)

### Key Indicators

- "Is there a difference between X and Y?" with no direction → **two-tailed**
- "X is greater/more/higher/faster than Y" → **one-tailed**
- Numbers like "1 = yes, 2 = no" in data → that's your **grouping/independent variable** (nominal)
- Question asks you to "compare frequencies" or "count how many" → **Chi-Square**, not a T-test
- If you get a negative T value → you just entered the smaller group first. Not wrong, just flip the sign when reporting.

### Excel Shortcuts

- **Fastest SD:** `=STDEV.P(range)` — skip all the manual steps
- **Fastest Z-score for one value:** `=(value - AVERAGE(range)) / STDEV.P(range)` — does it in one cell
- **Fastest variance:** `=VAR.P(range)` — no manual squaring needed
- **Quick area under curve:** `=NORM.DIST(upper, mean, sd, TRUE) - NORM.DIST(lower, mean, sd, TRUE)`
- **Check your work:** Squared deviations should NEVER be negative. If they are, you messed up.
- **Drag trick:** Always Paste Special → Values for mean and SD before dragging. Otherwise Excel shifts the reference.
- **Typing `=` in a cell** = tells Excel you're about to enter a formula
- **Caret `^`** (Shift+6) = "raised to the power of" → `^2` = squared, `^3` = cubed
- **Quick median without sorting:** `=MEDIAN(range)` — Excel sorts for you internally
- **Count only numbers (ignore blanks/text):** `=COUNT(range)` — skips empty cells automatically

### Common Conceptual Pitfalls

1. **"Is this a Z-test?"** If you're comparing 2 independent groups (boys vs girls, dogs vs cats) → NO, it's Independent T. Z-test is ONLY sample vs population.
2. **"Why isn't this significant?"** T-value close to 1 = only 1 SD from mean = common = not rare enough = P > .05.
3. **"What's wrong with this study?"** Look for inflated N (huge sample + tiny effect size = Type I error) or tiny N (couldn't detect anything = Type II error).
4. **Ordinal trap:** Rating scales (1-5, Likert) = ordinal, NOT interval. Just because it uses numbers doesn't make it metric. Exception: 7+ point scales can be treated as metric.
5. **"Average" trick:** If a hypothesis could be read as counting OR averaging, add "on average" to make it clearly parametric. Without it → might be Chi-Square territory.

### Key Numbers Reference

| What | Number |
|------|--------|
| Two-tailed critical value | 1.96 |
| One-tailed critical value | 1.645 |
| % within ±1 SD | 68% (34% each side) |
| % within ±2 SD | 95% (13.5% each band) |
| % within ±3 SD | 99.7% (2.35% each band) |
| % above or below mean | Always 50% |
| P-value threshold | < .05 |
| Effect size minimum | ≥ 0.10 (Cohen's d) |
| Cohen's d small/medium/large | 0.2 / 0.5 / 0.8 |
| Correlation r small/medium/large | 0.1 / 0.3 / 0.5 |
| IQ mean / SD | 100 / 15 |
| IQ cognitively disabled | ≤ 70 (2.5% of pop) |
| IQ genius | ≥ 130 (2.5% of pop) |
| Z distribution mean / SD | Always 0 / always 1 |
| df for dependent T | N − 1 |
| df for independent T | N − 2 |

### If You're Stuck — Quick Decision Path

```
Is it asking you to COUNT things (frequencies)? 
  → YES → Chi-Square (non-parametric)
  → NO (it involves averages/means) → continue below

Is it comparing a sample to a whole population?
  → YES → Know population SD? → Z-test
         → Don't know population SD? → Single Sample T-test
  → NO → continue below

Is it 2 different groups being compared?
  → YES → Independent T-test
  → NO → continue below

Is it the same group measured twice or rating 2 things?
  → YES → Dependent (Paired) T-test

Does it specify a direction (higher/lower/more/less)?
  → YES → One-tailed
  → NO (just says "different" or "differ") → Two-tailed
```

---

## P-Values — Problems & Misconceptions

### What a P-Value Actually Is

- **Plain English:** The probability of getting results at least as extreme as what you observed, IF the null hypothesis were true (if nothing is really going on).
- P-value does NOT tell you the probability your hypothesis is correct.
- P-value does NOT tell you the probability your result is a false alarm.
- It ONLY summarizes data assuming the null is true. It cannot work backwards to make statements about underlying reality.

### Common Misinterpretation

- ❌ "P = 0.01 means there's a 1% chance this is a false alarm" — WRONG
- ✅ A P-value of 0.01 actually corresponds to at least an **11% false-alarm probability** (depending on how plausible the hypothesis was beforehand)
- ✅ A P-value of 0.05 corresponds to at least a **29% false-alarm probability**
- The more implausible the hypothesis, the greater the chance a small P-value is still a false alarm

### P = 0.05 as "Significant"

- Introduced by Ronald Fisher in the 1920s as an *informal* indicator — "worthy of a second look," NOT a definitive test
- Was never meant to be a rigid cutoff
- The 0.05 threshold became enshrined when non-statisticians wrote textbooks combining Fisher's P-value with Neyman/Pearson's decision framework — creating a hybrid system neither camp intended

### P-Hacking (Data Dredging)

- **Definition:** Trying multiple analyses, dropping conditions, or manipulating data until you get P < 0.05 — even unconsciously
- Also called: data-dredging, snooping, fishing, significance-chasing, double-dipping
- Can increase false-positive rate in a single study to **60%**
- Evidence shows many published papers have P-values that cluster suspiciously around 0.05
- Turns exploratory findings into what LOOK like confirmations but vanish on replication

### The Replication Crisis

- John Ioannidis (2005): suggested most published findings are **false**
- Many high-profile studies fail to replicate
- A P = 0.01 result has only about a **73% probability of replicating** (not 99% as most assume) — or 50% if you want another "very significant" result
- This is why the replication crisis exists

### Key Problem: P-Values Ignore Effect Size

- A study of 19,000+ people found meeting spouse online reduces divorce (P < 0.002) — sounds impressive
- But actual effect: divorce went from 7.67% to 5.96%, happiness from 5.48 to 5.64 on a 7-point scale — **tiny, practically meaningless effects**
- Small P-values with huge samples can make trivial differences look significant
- Should ask "How much of an effect?" not just "Is there an effect?"

### Proposed Fixes (from literature)

- Report effect sizes + confidence intervals alongside p-values
- Pre-registration (declare methods/hypotheses BEFORE data collection)
- Full disclosure of sample size decisions, exclusions, all measures
- Bayesian methods (incorporate prior plausibility)
- Try multiple methods on same data; if they disagree, investigate why

### Key Takeaway

- P-values are not as reliable or objective as assumed
- They're one piece of evidence, not a definitive answer
- "The numbers are where the scientific discussion should start, not end"

### P-Value Quick Reference

**Strength guide:** P < 0.001 very strong | P < 0.01 strong | P < 0.05 moderate | P ≥ 0.05 insufficient

**Key rules:**
- "Fail to reject H0" ≠ "Accept H0" — just means not enough evidence yet
- One-tailed p = exactly HALF the two-tailed p (why one-tailed is easier)
- **Power = 1 − beta** = probability of correctly detecting a real effect. Low power (small N) → Type II error.
- **Bonferroni correction:** Running 20 tests at α=.05 → expect ~1 false positive. Fix: α = 0.05 / number of tests

### Effect Size Rules of Thumb

| Measure | Small | Medium | Large |
|---------|-------|--------|-------|
| **Cohen's d** (comparing 2 means) | 0.2 | 0.5 | 0.8 |
| **Correlation r** (relationships) | 0.1 | 0.3 | 0.5 |

- Cohen's d = (Mean1 − Mean2) / pooled SD
- These are independent of sample size — N can't inflate them

### Significant Difference vs Significant Relationship

| | Significant Difference | Significant Relationship |
|---|----------------------|--------------------------|
| **Tests whether** | Groups differ on an outcome | Two variables move together |
| **Typical data** | One categorical (groups) + one outcome | Two continuous variables |
| **Common tests** | T-test, ANOVA, Chi-square | Pearson r, Spearman rho, Regression |
| **Example** | "Men and women differ in job satisfaction" | "Hours of training correlates with performance" |
