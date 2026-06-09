# Stats One-Pager for Golden Retrievers 🐕

---

## MEASURES OF CENTRAL TENDENCY
*"Where's the middle of my data?"*

| Concept | ELI5 (Explain Like I'm a Dog) | Excel Formula | SPSS | Example | Notes |
|---------|-------------------------------|---------------|------|---------|-------|
| **Mean** | Add all numbers, divide by how many there are. The "average." | `=AVERAGE(A1:A10)` | Analyze → Descriptive Statistics → Descriptives | Data: 1, 2, 3, 6, 8 → Sum=20, N=5 → Mean = 20/5 = **4** | Sensitive to outliers. One billionaire walks into a bar and "on average" everyone's a millionaire. Symbol: μ (population), M or x̄ (sample) |
| **Median** | Line up all numbers smallest→largest. Pick the middle one. If two middles, average those two. | `=MEDIAN(A1:A10)` | Analyze → Descriptive Statistics → Frequencies → Statistics → check Median | Odd: 2, 4, **7**, 9, 11 → Median = **7**. Even: 2, 4, 7, 12 → (4+7)/2 = **5.5** | Better than mean when you have outliers/skewed data. It's the 50th percentile. |
| **Mode** | The number that shows up the most. | `=MODE(A1:A10)` | Analyze → Descriptive Statistics → Frequencies → Statistics → check Mode | Data: 18, 18, 18, 18, 21, 21, 22, 33 → Mode = **18** (appears 4 times) | Can have no mode, one mode, or multiple modes. Used for categorical data. |

---

## MEASURES OF VARIABILITY
*"How spread out is my data?"*

| Concept | ELI5 | Excel Formula | SPSS | Example | Notes |
|---------|------|---------------|------|---------|-------|
| **Range** | Biggest minus smallest. That's it. | `=MAX(A1:A10)-MIN(A1:A10)` | Analyze → Descriptive Statistics → Descriptives → Options → check Range | Data: 3, 5, 7, 10, 15 → 15 - 3 = **12** | Super simple but one extreme value ruins it. |
| **Interquartile Range (IQR)** | Chop off the bottom 25% and top 25%. Range of what's left. | `=QUARTILE(A1:A10,3)-QUARTILE(A1:A10,1)` | Analyze → Descriptive Statistics → Frequencies → Statistics → check Quartiles | Data: 2, 4, 6, 8, 10, 12, 14 → Q1=4, Q3=12 → IQR = **8** | Not affected by outliers. Used in box plots. |
| **Variance** | Average of squared distances from the mean. | `=VAR(A1:A10)` (sample) / `=VARP(A1:A10)` (population) | Analyze → Descriptive Statistics → Descriptives → Options → check Variance | Data: 1, 2, 4, 5. Mean=3. Deviations: -2,-1,1,2. Squared: 4,1,1,4. Sum=10. Variance = 10/(4-1) = **3.33** | Sample uses N-1 (Bessel's correction). Units are squared. |
| **Standard Deviation (SD)** | Square root of variance. "On average, how far are values from the mean?" | `=STDEV(A1:A10)` (sample) / `=STDEVP(A1:A10)` (population) | Analyze → Descriptive Statistics → Descriptives (on by default) | From above: √3.33 = **1.83** | 68% within ±1 SD. 95% within ±2 SD. Symbol: σ (population), s (sample) |

---

## LEVELS OF MEASUREMENT
*"What kind of data do I even have?"*

| Level | ELI5 | Example | What you can do | SPSS Variable Type |
|-------|------|---------|-----------------|-------------------|
| **Nominal** | Just names/labels. No order. | Favorite color, gender, yes/no | Count them. Mode only. No math. | Measure → Nominal |
| **Ordinal** | Has an order, but gaps between ranks aren't equal. | "hate it" → "love it", 1st/2nd/3rd place | Median, mode. Can rank but can't say "how much more." | Measure → Ordinal |
| **Interval** | Equal gaps, but no true zero. | Temperature °F (0° doesn't mean "no temp"), IQ | Mean, SD all work. Can't say "twice as much." | Measure → Scale |
| **Ratio** | Equal gaps AND true zero (zero = nothing). | Height, weight, money, time | Everything works. "Twice as heavy" makes sense. | Measure → Scale |

**Example of why it matters:** If kids pick favorite colors coded as 1=Blue, 2=Red, 3=Yellow → the average is 2, but that does NOT mean the average color is Red. You can't do math on nominal data.

---

## HYPOTHESIS TESTING & P-VALUES
*"Is my result real or just luck?"*

| Concept | ELI5 | Example | Key Info |
|---------|------|---------|----------|
| **Null Hypothesis (H₀)** | "Nothing is happening. Any difference is just random noise." | "The new drug does NOT work better than placebo." | The boring default. You're trying to REJECT this. |
| **Alternative Hypothesis (H₁)** | "Something IS happening. There's a real effect." | "The new drug DOES work better than placebo." | What you actually think is true. |
| **P-value** | "If nothing were happening, how likely would I see results this extreme?" | p = 0.03 means "there's a 3% chance of seeing this if H₀ is true" | Small p = your data is weird under H₀. NOT "3% chance I'm wrong." |
| **Alpha (α)** | Your threshold for calling BS. Usually 0.05. | α = 0.05 → you accept a 5% risk of a false alarm | If p < α → reject H₀ → "statistically significant." |
| **Type I Error** | False alarm. You said there's an effect but there isn't. | Convicting an innocent person. | Rate = α. You cry wolf. |
| **Type II Error** | Missed it. There IS an effect but you didn't catch it. | Letting a guilty person go free. | Rate = β. The wolf ate your sheep. |
| **Statistical Significance** | p < 0.05. Result probably isn't random chance. | t-test gives p = 0.02 → "significant difference" | Does NOT mean important or big. Just means probably not zero. |
| **Effect Size** | HOW BIG is the difference? | Cohen's d = 0.2 (small), 0.5 (medium), 0.8 (large) | Always report alongside p-value. Significance ≠ importance. |

**Example:** 1000 people take an IQ test. Males: mean=98, Females: mean=100. t-test → p = 0.001. "Significant!" But a 2-point IQ difference is meaningless in real life. Statistically significant ≠ practically significant.

---

## A FEW MORE THINGS YOU NEED TO KNOW

| Concept | ELI5 | Example |
|---------|------|---------|
| **Degrees of Freedom (df)** | The number of values free to vary once you've fixed something (like the mean). Think: you have 5 numbers that must add to 20. Pick any 4 freely — the 5th is locked. df = N - 1. | 5 scores, mean fixed → df = 4. For t-test: df = n₁ + n₂ - 2. For ANOVA: df between = k-1, df within = N-k. |
| **Statistical Power** | The chance you'll catch a real effect if one exists. Power = 1 - β. | Power = 0.80 means 80% chance you'll detect a true effect. Low power = you'll probably miss real effects. Increase power by: bigger sample, bigger effect, less noise. |
| **Confidence Interval (CI)** | A range that likely contains the true value. "We're 95% sure the real mean is between X and Y." | Sample mean = 50, 95% CI = [45, 55]. The true population mean is probably in that range. Narrow CI = precise. Wide CI = uncertain. |
| **One-tailed vs Two-tailed** | Two-tailed: "Is there ANY difference?" (could be higher or lower). One-tailed: "Is A specifically HIGHER than B?" | Two-tailed: "Males ≠ Females on IQ." One-tailed: "Females > Males on IQ." One-tailed is easier to get significance but riskier — you ignore the other direction. Default to two-tailed unless you predicted direction BEFORE data collection. |

---

## NORMAL DISTRIBUTION
*"The bell curve"*

| Concept | ELI5 | Example | Key Info |
|---------|------|---------|----------|
| **Normal Distribution** | Most values in the middle, fewer at edges. Bell shape. | Heights of adults: most around 5'7", very few at 4'5" or 7'0" | Defined by mean (center) and SD (width). Mean = Median = Mode. |
| **Z-score** | "How many SDs away from the mean?" z = (X - μ) / σ | Mean=100, SD=15. Score=130 → z = (130-100)/15 = **2.0** (2 SDs above average) | Excel: `=STANDARDIZE(X, mean, SD)`. SPSS: Analyze → Descriptive Statistics → Descriptives → check "Save standardized values" |
| **68-95-99.7 Rule** | 68% within ±1 SD. 95% within ±2 SD. 99.7% within ±3 SD. | IQ: mean=100, SD=15 → 68% between 85-115, 95% between 70-130 | If you're 3+ SDs away, you're in the 0.3% (extreme). |
| **Z-table** | Converts z-scores to percentages/probabilities. | z = 1.96 → 97.5% of data is below this value | Used to find p-values for z-tests. |

---

## COMMON STATISTICAL TESTS
*"Which button do I press?"*

| Situation | Test | SPSS Path | Example | ELI5 |
|-----------|------|-----------|---------|------|
| Compare 2 group means (independent) | **Independent t-test** | Analyze → Compare Means → Independent-Samples T Test | "Do smokers vs non-smokers differ in lung capacity?" | Checks if difference between 2 groups is real or luck. |
| Compare 2 means (same people, before/after) | **Paired t-test** | Analyze → Compare Means → Paired-Samples T Test | "Did test scores improve after tutoring?" (pre vs post) | Same people measured twice. |
| Compare 3+ group means | **One-way ANOVA** | Analyze → Compare Means → One-Way ANOVA | "Do nonsmokers, past smokers, and current smokers differ in sprint time?" | Like a t-test but for 3+ groups. Gives F-statistic. |
| 2 factors at once | **Two-way ANOVA** | Analyze → General Linear Model → Univariate | "Do BOTH sex and genotype affect enzyme activity? Do they interact?" | Tests main effects + interaction. |
| Relationship between 2 continuous variables | **Pearson correlation** | Analyze → Correlate → Bivariate | "As study hours ↑, do exam scores ↑?" r=0.45 | r ranges -1 to +1. Strength + direction. |
| Predict a continuous outcome | **Linear regression** | Analyze → Regression → Linear | "Can I predict GPA from study hours?" | Gives you an equation: Y = a + bX |
| Compare proportions/categories | **Chi-square (χ²)** | Analyze → Descriptive Statistics → Crosstabs → Statistics → Chi-square | "Is gender associated with voting preference?" | For categorical × categorical. |
| Ordinal/non-normal data, 2 groups | **Mann-Whitney U** | Analyze → Nonparametric Tests → Legacy Dialogs → 2 Independent Samples | "Do groups differ on satisfaction (ordinal scale)?" | Non-parametric t-test alternative. |
| Ordinal/non-normal data, 3+ groups | **Kruskal-Wallis** | Analyze → Nonparametric Tests → Legacy Dialogs → K Independent Samples | "Do 4 treatment groups differ on pain rating (ordinal)?" | Non-parametric ANOVA alternative. |
| Same people, ordinal, 2 time points | **Wilcoxon Signed-Rank** | Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples | "Did ordinal satisfaction change pre→post?" | Non-parametric paired t-test. |

---

## STEP-BY-STEP: HOW TO DO EACH TEST

---

### 📐 MEAN — Step by Step

**By hand:**
1. Add up all your numbers → that's ΣX
2. Count how many numbers you have → that's N
3. Divide: ΣX ÷ N = Mean

> Example: 4, 8, 6, 5, 7 → Sum = 30, N = 5 → Mean = 30/5 = **6**

**In Excel:**
1. Put your data in a column (say A1:A5)
2. In an empty cell type: `=AVERAGE(A1:A5)`
3. Press Enter. Done.

---

### 📐 MEDIAN — Step by Step

**By hand:**
1. Sort numbers from smallest to largest
2. If ODD count → the middle number is the median
3. If EVEN count → average the two middle numbers

> Example (odd): 3, 1, 7, 5, 2 → Sorted: 1, 2, **3**, 5, 7 → Median = **3**
> Example (even): 4, 8, 1, 6 → Sorted: 1, 4, 6, 8 → Middle two: 4, 6 → (4+6)/2 = **5**

**In Excel:**
1. Put data in A1:A5
2. Type: `=MEDIAN(A1:A5)`
3. Enter. Done.

---

### 📐 MODE — Step by Step

**By hand:**
1. Count how many times each number appears
2. Whichever number appears the most = mode

> Example: 3, 5, 5, 7, 5, 8, 7 → 5 appears 3 times (most) → Mode = **5**

**In Excel:**
1. Put data in A1:A7
2. Type: `=MODE(A1:A7)`
3. Enter. (If no mode exists, Excel returns #N/A)

---

### 📐 RANGE — Step by Step

**By hand:**
1. Find the biggest number
2. Find the smallest number
3. Subtract: Max - Min = Range

> Example: 12, 3, 7, 19, 5 → Max=19, Min=3 → Range = 19-3 = **16**

**In Excel:**
1. Type: `=MAX(A1:A5)-MIN(A1:A5)`

---

### 📐 VARIANCE & STANDARD DEVIATION — Step by Step

**By hand (sample variance):**
1. Calculate the mean
2. For each number: subtract the mean → that's the deviation
3. Square each deviation
4. Add up all squared deviations
5. Divide by (N - 1) → that's the **sample variance** (s²)
6. Take the square root → that's the **standard deviation** (s)

> Example: Data = 2, 4, 4, 4, 5, 5, 7, 9
> 1. Mean = 40/8 = 5
> 2. Deviations: -3, -1, -1, -1, 0, 0, 2, 4
> 3. Squared: 9, 1, 1, 1, 0, 0, 4, 16
> 4. Sum of squares = 32
> 5. Variance = 32/(8-1) = 32/7 = **4.57**
> 6. SD = √4.57 = **2.14**

**In Excel:**
1. Variance: `=VAR(A1:A8)` (sample) or `=VARP(A1:A8)` (population)
2. Standard Deviation: `=STDEV(A1:A8)` (sample) or `=STDEVP(A1:A8)` (population)

---

### 📐 Z-SCORE — Step by Step

**By hand:**
1. Take your value (X)
2. Subtract the mean (μ)
3. Divide by the standard deviation (σ)
4. z = (X - μ) / σ

> Example: Your score = 85, Class mean = 70, SD = 10
> z = (85 - 70) / 10 = 15/10 = **1.5** (you're 1.5 SDs above average)

**In Excel:**
1. Type: `=STANDARDIZE(85, 70, 10)` → returns 1.5
2. To get the p-value (area to the left): `=NORM.S.DIST(1.5, TRUE)` → returns 0.9332 (93.32% below you)

---

### 📐 Z-TEST — Step by Step

**By hand:**
1. State H₀ (expected value) and H₁
2. Calculate the observed value (usually a mean)
3. Calculate SE = σ / √n (or SD × √n for sums)
4. z = (Observed - Expected) / SE
5. Look up z in the z-table to find p-value
6. If p < α (usually 0.05) → reject H₀

> Example: Expected to win $32, actually lost $27. SD=1.88, n=100.
> SE = √100 × 1.88 = 18.8
> z = (-27 - 32) / 18.8 = -59/18.8 = **-3.14**
> Z-table: z of 3.14 → area = 0.9992, so tail = 0.0008
> One-tailed p ≈ 0.001 → Reject H₀ (friend cheated)

**In Excel:**
1. Calculate z manually in a cell: `=(observed - expected) / SE`
2. Get p-value (two-tailed): `=2*(1-NORM.S.DIST(ABS(z_value), TRUE))`
3. Or one-tailed: `=1-NORM.S.DIST(ABS(z_value), TRUE)`

---

### 📐 INDEPENDENT SAMPLES T-TEST — Step by Step

**By hand:**
1. Calculate mean for each group (M₁, M₂)
2. Calculate variance for each group (s₁², s₂²)
3. Calculate SE = √(s₁²/n₁ + s₂²/n₂)
4. t = (M₁ - M₂) / SE
5. df = n₁ + n₂ - 2
6. Look up t in a t-table with your df → get p-value
7. If p < 0.05 → significant difference

> Example:
> Group A (drug): scores = 8, 7, 9, 8, 10 → M₁=8.4, s₁²=1.3, n₁=5
> Group B (placebo): scores = 5, 6, 4, 7, 5 → M₂=5.4, s₂²=1.3, n₂=5
> SE = √(1.3/5 + 1.3/5) = √(0.26 + 0.26) = √0.52 = 0.72
> t = (8.4 - 5.4) / 0.72 = 3.0 / 0.72 = **4.17**
> df = 5 + 5 - 2 = 8
> t-table: t=4.17 with df=8 → p < 0.01 → **Reject H₀, drug works**

**In Excel:**
1. Put Group A in column A (A1:A5), Group B in column B (B1:B5)
2. Type: `=T.TEST(A1:A5, B1:B5, 2, 2)`
   - First "2" = two-tailed
   - Second "2" = type 2 (two-sample equal variance; use 3 for unequal)
3. This gives you the **p-value** directly
4. If you want the t-statistic itself, use Data → Data Analysis → t-Test: Two-Sample Assuming Equal Variances

**Excel Data Analysis Toolpak (more detailed output):**
1. Go to Data tab → Data Analysis (if missing: File → Options → Add-ins → Analysis ToolPak → Go → check it → OK)
2. Choose "t-Test: Two-Sample Assuming Equal Variances"
3. Variable 1 Range: select Group A data
4. Variable 2 Range: select Group B data
5. Alpha: 0.05
6. Click OK → gives you means, variances, t-stat, p-values, and critical t

---

### 📐 PAIRED SAMPLES T-TEST — Step by Step

**By hand:**
1. For each person, calculate: Difference = After - Before
2. Calculate the mean of differences (D̄)
3. Calculate SD of differences (s_D)
4. SE = s_D / √n
5. t = D̄ / SE
6. df = n - 1 (n = number of pairs)
7. Look up t in table → get p

> Example: 5 students, Before = [60, 65, 70, 55, 75], After = [70, 68, 80, 62, 82]
> Differences: 10, 3, 10, 7, 7
> D̄ = 37/5 = 7.4
> SD of diffs: deviations from 7.4 are (2.6, -4.4, 2.6, -0.4, -0.4) → squared: 6.76, 19.36, 6.76, 0.16, 0.16 → sum=33.2 → var=33.2/4=8.3 → SD=2.88
> SE = 2.88/√5 = 2.88/2.24 = 1.29
> t = 7.4/1.29 = **5.74**
> df = 4. t-table: p < 0.01 → **Significant improvement**

**In Excel:**
1. Put Before in column A, After in column B
2. Quick p-value: `=T.TEST(A1:A5, B1:B5, 2, 1)`
   - First "2" = two-tailed
   - "1" = type 1 (paired)
3. Or: Data → Data Analysis → "t-Test: Paired Two Sample for Means"

---

### 📐 ONE-WAY ANOVA — Step by Step

**By hand:**
1. Calculate the overall mean (grand mean) of ALL scores
2. Calculate each group's mean
3. **SS Between** = Σ n_group × (group mean - grand mean)²
4. **SS Within** = Σ (each score - its group mean)²
5. df between = k - 1 (k = number of groups)
6. df within = N - k (N = total scores)
7. MS Between = SS Between / df between
8. MS Within = SS Within / df within
9. F = MS Between / MS Within
10. Look up F in F-table (with df between and df within) → get p

> Example: 3 groups of 4 students each
> Group A: 5, 6, 7, 6 → Mean = 6
> Group B: 8, 9, 7, 8 → Mean = 8
> Group C: 4, 3, 5, 4 → Mean = 4
> Grand Mean = (24+32+16)/12 = 72/12 = 6
> SS Between = 4×(6-6)² + 4×(8-6)² + 4×(4-6)² = 0 + 16 + 16 = **32**
> SS Within = [(5-6)²+(6-6)²+(7-6)²+(6-6)²] + [(8-8)²+(9-8)²+(7-8)²+(8-8)²] + [(4-4)²+(3-4)²+(5-4)²+(4-4)²] = 2 + 2 + 2 = **6**
> df between = 3-1 = 2, df within = 12-3 = 9
> MS Between = 32/2 = 16, MS Within = 6/9 = 0.667
> F = 16/0.667 = **24.0**
> F-table: F(2,9) critical at α=0.05 is 4.26. Our F=24 >> 4.26 → **p < 0.001, significant**

**In Excel:**
1. Put each group in its own column (A, B, C)
2. Data → Data Analysis → "Anova: Single Factor"
3. Input Range: select all three columns
4. Grouped By: Columns
5. Alpha: 0.05
6. Click OK → gives you SS, df, MS, F, P-value, and F-critical

**If you don't have Data Analysis Toolpak:**
- You can use: `=F.TEST(A1:A4, B1:B4)` for 2 groups (but this is really for comparing variances)
- For a proper one-way ANOVA p-value without the toolpak, you'd need to calculate F manually then: `=F.DIST.RT(F_value, df_between, df_within)` to get the p-value

---

### 📐 TWO-WAY ANOVA — Step by Step

**By hand (conceptual — you'd never do this without software):**
1. Calculate grand mean
2. Calculate row means (factor A), column means (factor B), and cell means (each combo)
3. SS Total = Σ(each score - grand mean)²
4. SS Factor A = Σ n × (row mean - grand mean)²
5. SS Factor B = Σ n × (column mean - grand mean)²
6. SS Interaction = SS Total - SS A - SS B - SS Within
7. SS Within = Σ(each score - its cell mean)²
8. Calculate MS and F for each effect (same logic as one-way)
9. Look up each F in the F-table

**In Excel:**
1. Set up data with one column per factor-level combination
2. Data → Data Analysis → "Anova: Two-Factor With Replication" (if multiple scores per cell) or "Two-Factor Without Replication" (if one score per cell)
3. Input Range: select the whole data block (including labels)
4. Rows per sample: how many data points per cell
5. Alpha: 0.05
6. Click OK → gives you F and p for Factor A, Factor B, AND Interaction

---

### 📐 PEARSON CORRELATION — Step by Step

**By hand:**
1. For each pair (X, Y): calculate X×Y, X², Y²
2. r = [NΣ(XY) - ΣX×ΣY] / √{[NΣX² - (ΣX)²][NΣY² - (ΣY)²]}

> Example: Hours studied (X) and Exam score (Y):
> (2, 60), (3, 70), (5, 80), (7, 90), (8, 95)
> N=5, ΣX=25, ΣY=395, ΣXY=2120, ΣX²=151, ΣY²=32225
> r = [5×2120 - 25×395] / √{[5×151 - 625][5×32225 - 156025]}
> r = [10600 - 9875] / √{[755 - 625][161125 - 156025]}
> r = 725 / √{130 × 5100}
> r = 725 / √663000
> r = 725 / 814.2 = **0.89** (strong positive correlation)

3. To test significance: t = r × √(n-2) / √(1-r²)
> t = 0.89 × √3 / √(1-0.79) = 0.89 × 1.73 / 0.458 = **3.36**
> df = n-2 = 3. Look up → p < 0.05 → significant correlation

**In Excel:**
1. Put X values in column A, Y values in column B
2. Correlation coefficient: `=CORREL(A1:A5, B1:B5)` → gives you r
3. Or: Data → Data Analysis → "Correlation" → select both columns
4. To get the p-value, you'd calculate t manually:
   - t: `=CORREL(A1:A5,B1:B5)*SQRT(COUNT(A1:A5)-2)/SQRT(1-CORREL(A1:A5,B1:B5)^2)`
   - p-value: `=T.DIST.2T(ABS(t_value), COUNT(A1:A5)-2)`

---

### 📐 CHI-SQUARE TEST OF INDEPENDENCE — Step by Step

**By hand:**
1. Make a contingency table (rows × columns of observed frequencies)
2. Calculate expected frequency for each cell: E = (Row Total × Column Total) / Grand Total
3. For each cell: (Observed - Expected)² / Expected
4. χ² = Sum of all those values
5. df = (rows - 1) × (columns - 1)
6. Look up χ² in chi-square table with your df

> Example: Is gender associated with preference (cats vs dogs)?
>
> |          | Cats | Dogs | Total |
> |----------|------|------|-------|
> | Male     | 20   | 30   | 50    |
> | Female   | 35   | 15   | 50    |
> | Total    | 55   | 45   | 100   |
>
> Expected values: E = (row total × col total) / grand total
> Male-Cats: (50×55)/100 = 27.5 | Male-Dogs: (50×45)/100 = 22.5
> Female-Cats: (50×55)/100 = 27.5 | Female-Dogs: (50×45)/100 = 22.5
>
> χ² = (20-27.5)²/27.5 + (30-22.5)²/22.5 + (35-27.5)²/27.5 + (15-22.5)²/22.5
> χ² = 2.045 + 2.5 + 2.045 + 2.5 = **9.09**
> df = (2-1)(2-1) = 1
> Chi-square table: critical value at df=1, α=0.05 is 3.84. Our 9.09 > 3.84 → **Significant association**

**In Excel:**
1. Set up your observed contingency table in cells (e.g., B2:C3)
2. Calculate expected values in another area: `=row_total*col_total/grand_total` for each cell
3. Chi-square statistic: `=CHISQ.TEST(observed_range, expected_range)` → this directly gives you the **p-value**
4. Example: `=CHISQ.TEST(B2:C3, B7:C8)` → returns p-value
5. If p < 0.05 → significant association

**Or manually calculate χ² then get p:**
- Calculate χ² by hand/formula
- p-value: `=CHISQ.DIST.RT(chi_sq_value, df)`

---

### 📐 LINEAR REGRESSION — Step by Step

**By hand:**
1. Calculate: slope (b) = [NΣ(XY) - ΣXΣY] / [NΣX² - (ΣX)²]
2. Calculate: intercept (a) = Ȳ - b×X̄
3. Your equation: Ŷ = a + bX
4. R² = r² (square the correlation) → tells you % of variance explained

> Example: From correlation above (hours→scores), r = 0.89
> b = [5×2120 - 25×395] / [5×151 - 625] = 725/130 = **5.58**
> a = 79 - 5.58×5 = 79 - 27.9 = **51.1**
> Equation: Score = 51.1 + 5.58 × Hours
> R² = 0.89² = 0.79 → hours studied explains **79%** of the variance in scores
> Predict: 6 hours → Score = 51.1 + 5.58×6 = 51.1 + 33.5 = **84.6**

**In Excel:**
1. Quick slope: `=SLOPE(Y_range, X_range)`
2. Quick intercept: `=INTERCEPT(Y_range, X_range)`
3. Quick R²: `=RSQ(Y_range, X_range)`
4. Full output: Data → Data Analysis → "Regression"
   - Input Y Range: your DV column
   - Input X Range: your IV column
   - Check "Labels" if first row has headers
   - Click OK → gives you R², coefficients, standard errors, t-values, p-values for each predictor, and ANOVA table

---

### 📐 MANN-WHITNEY U TEST (Non-parametric t-test) — Step by Step

**By hand:**
1. Combine all scores from both groups and rank them (1 = lowest)
2. If ties: assign average rank to tied scores
3. Sum the ranks for each group (R₁, R₂)
4. U₁ = n₁n₂ + n₁(n₁+1)/2 - R₁
5. U₂ = n₁n₂ + n₂(n₂+1)/2 - R₂ (or U₂ = n₁n₂ - U₁)
6. Take the smaller U. Look up in U-table or convert to z for large samples

> Example: Group A: 4, 7, 8 (n=3). Group B: 1, 2, 5 (n=3)
> Combined ranked: 1(B), 2(B), 4(A), 5(B), 7(A), 8(A) → Ranks: B gets 1,2,4; A gets 3,5,6
> R_A = 3+5+6 = 14, R_B = 1+2+4 = 7
> U_A = 3×3 + 3(4)/2 - 14 = 9 + 6 - 14 = 1
> U_B = 3×3 - 1 = 8
> Smaller U = 1. Look up in table (n₁=3, n₂=3): critical U at α=0.05 = 0. Since 1 > 0 → **Not significant** (need bigger sample)

**In Excel:**
- Excel doesn't have a built-in Mann-Whitney function
- Workaround: Use the Data Analysis Toolpak's "Rank and Percentile" to get ranks, then calculate U manually
- Or use: `=T.TEST(A1:A3, B1:B3, 2, 3)` as an approximation (Welch's t-test handles unequal variance/non-normal decently for larger samples)
- Best option: Use SPSS or R for non-parametric tests

---

## Z-TEST FORMULA

```
z = (Observed - Expected) / Standard Error
```

| Part | What it means | Example |
|------|---------------|---------|
| Observed | What you actually got | You lost $27 at a game |
| Expected | What you'd expect if H₀ is true | Fair game → expect to win $32 |
| SE | Expected random wobble. SE = SD / √n | SD=1.88, n=100 → SE = 1.88×√100 = 18.8 |
| z result | How many SEs from expected | z = (-27 - 32)/18.8 = **-3.14** |
| Conclusion | Look up z in table → get p-value | z = -3.14 → p ≈ 0.001 → reject H₀ → your friend cheated you |

---

## T-TEST FORMULAS

### Independent Samples t-test (2 different groups)
```
t = (Mean₁ - Mean₂) / √(Var₁/n₁ + Var₂/n₂)
```

| Part | Meaning | Example |
|------|---------|---------|
| Top (numerator) | The signal — difference between groups | Treatment mean = 75, Control mean = 70 → difference = 5 |
| Bottom (denominator) | The noise — standard error of the difference | Var₁=16, n₁=30, Var₂=20, n₂=30 → √(16/30 + 20/30) = √1.2 = 1.095 |
| t value | Signal / Noise | t = 5 / 1.095 = **4.57** |
| Conclusion | Look up in t-table (df = n₁ + n₂ - 2) | df=58, t=4.57 → p < 0.001 → significant difference |

### Paired Samples t-test (same people, 2 time points)
```
t = Mean of differences / (SD of differences / √n)
```

| Part | Meaning | Example |
|------|---------|---------|
| Differences | For each person: After - Before | Scores before: 60, 65, 70. After: 75, 70, 80. Differences: 15, 5, 10 |
| Mean of differences | Average change | (15+5+10)/3 = **10** |
| SD of differences | How much the changes vary | SD = 5 |
| SE | SD / √n | 5/√3 = 2.89 |
| t | Mean diff / SE | 10 / 2.89 = **3.46** |
| Conclusion | df = n - 1 (number of pairs minus 1) | df=2, t=3.46 → check t-table → significant improvement |

**SPSS output gives you:** Group Statistics table (means, SDs) + Independent Samples Test table (Levene's test for equal variances, t-value, df, Sig./p-value).

**Reading SPSS t-test output:**
1. Check Levene's Test → if Sig. > 0.05, use "Equal variances assumed" row
2. Look at "Sig. (2-tailed)" column → that's your p-value
3. p < 0.05 → significant difference between groups

---

## ANOVA CHEAT

```
F = MS Between / MS Within = (Variance BETWEEN groups) / (Variance WITHIN groups)
```

| Component | Formula | Example |
|-----------|---------|---------|
| SS Between (SSR) | Variation due to group differences | 26.788 |
| SS Within (SSE) | Variation within groups (noise) | 509.082 |
| df between | k - 1 (k = number of groups) | 3 groups → df = 2 |
| df within | N - k (N = total observations) | 353 people, 3 groups → df = 350 |
| MS Between | SSR / df between | 26.788 / 2 = 13.394 |
| MS Within | SSE / df within | 509.082 / 350 = 1.455 |
| F | MS Between / MS Within | 13.394 / 1.455 = **9.209** |
| p-value | From F-distribution table | p < 0.001 → significant |

**Example:** Sprint times for nonsmokers, past smokers, current smokers.
- Nonsmokers: mean = 6.41s | Past: 6.84s | Current: 7.12s
- F(2, 350) = 9.209, p < 0.001
- Conclusion: "At least one group is significantly different." (Need post-hoc to find which.)

**SPSS output:** ANOVA table with Sum of Squares, df, Mean Square, F, and Sig.

**Post-hoc tests in SPSS:** In the One-Way ANOVA dialog → click "Post Hoc" → check Tukey or Bonferroni → tells you WHICH specific pairs differ.

---

## TWO-WAY ANOVA

Tests THREE things at once:
1. **Main Effect A** — Does factor A matter? (e.g., does genotype affect activity?)
2. **Main Effect B** — Does factor B matter? (e.g., does sex affect activity?)
3. **Interaction (A×B)** — Does the effect of A depend on B? (e.g., does genotype's effect differ for males vs females?)

**Example:** Weevils raised on artificial diet (AD) vs sweet potato (SP), tested on each food.
- Interaction significant (p < 0.001): SP strain laid more eggs on sweet potato, AD strain laid more eggs on artificial diet.
- If interaction is significant → don't just interpret main effects alone, they're misleading.

**SPSS:** Analyze → General Linear Model → Univariate → put DV in "Dependent Variable," both factors in "Fixed Factor(s)"

---

## 🐕 LASSIE'S "WHICH TEST DO I RUN?" GUIDE

**Answer these questions in order. Stop when you get your answer.**

---

### Question 1: What are you trying to DO?

| I want to... | Go to → |
|---|---|
| **Describe** my data (averages, spread, frequencies) | → Question 2A |
| **Compare groups** (is one group higher/different than another?) | → Question 3 |
| **Find a relationship** (do two things go together?) | → Question 6 |
| **Predict** something (if I know X, can I guess Y?) | → Question 7 |

---

### Question 2A: Just describing data?

| What kind of variable? | SPSS Path | What you get |
|---|---|---|
| Continuous (numbers like height, scores, time) | **Analyze → Descriptive Statistics → Descriptives** | Mean, SD, Min, Max |
| Categorical (groups like gender, color, yes/no) | **Analyze → Descriptive Statistics → Frequencies** | Counts, percentages, mode |
| Want median, quartiles, or to check normality | **Analyze → Descriptive Statistics → Explore** | Median, IQR, normality tests, boxplots |

**You're done. No hypothesis test needed.**

---

### Question 3: Comparing groups — How many groups?

| How many groups are you comparing? | Go to → |
|---|---|
| **2 groups** | → Question 4 |
| **3 or more groups** | → Question 5 |

---

### Question 4: Two groups — Same people or different people?

| | Different people (independent) | Same people measured twice (paired) |
|---|---|---|
| **DV is continuous + data is normal** | **Independent t-test** | **Paired t-test** |
| | Analyze → Compare Means → Independent-Samples T Test | Analyze → Compare Means → Paired-Samples T Test |
| **DV is ordinal OR data is NOT normal** | **Mann-Whitney U** | **Wilcoxon Signed-Rank** |
| | Analyze → Nonparametric → Legacy → 2 Independent Samples | Analyze → Nonparametric → Legacy → 2 Related Samples |

**How to tell "same people" vs "different people":**
- Same people = Before/After, Pre/Post, Left hand vs Right hand, Monday vs Friday ON THE SAME SUBJECTS
- Different people = Males vs Females, Drug group vs Placebo group, Smokers vs Non-smokers

---

### Question 5: Three or more groups — Same people or different people?

| | Different people (independent) | Same people measured 3+ times (repeated) |
|---|---|---|
| **DV is continuous + data is normal** | **One-way ANOVA** | **Repeated Measures ANOVA** |
| | Analyze → Compare Means → One-Way ANOVA | Analyze → General Linear Model → Repeated Measures |
| **DV is ordinal OR data is NOT normal** | **Kruskal-Wallis** | **Friedman** |
| | Analyze → Nonparametric → Legacy → K Independent Samples | Analyze → Nonparametric → Legacy → K Related Samples |

**Got 2 grouping variables (factors) at once?** (e.g., comparing by BOTH gender AND treatment)
→ **Two-way ANOVA**: Analyze → General Linear Model → Univariate

**ANOVA is significant? Need to know WHICH groups differ?**
→ Post-hoc: In the ANOVA dialog, click **Post Hoc** → check **Tukey** (equal variances) or **Games-Howell** (unequal variances)

---

### Question 6: Looking for a relationship?

| What kind of variables? | Test | SPSS Path |
|---|---|---|
| Both continuous (numbers & numbers) + normal | **Pearson correlation** | Analyze → Correlate → Bivariate → check Pearson |
| One or both ordinal, OR not normal | **Spearman correlation** | Analyze → Correlate → Bivariate → check Spearman |
| Both categorical (groups & groups) | **Chi-square test of independence** | Analyze → Descriptive Statistics → Crosstabs → Statistics → Chi-square |
| One binary (yes/no) + one continuous | **Point-biserial correlation** | Same as Pearson in SPSS (it handles it automatically) |

---

### Question 7: Trying to predict an outcome?

| What's the outcome (DV) you're predicting? | Test | SPSS Path |
|---|---|---|
| DV is continuous (a number) | **Linear regression** | Analyze → Regression → Linear |
| DV is binary (yes/no, pass/fail) | **Binary logistic regression** | Analyze → Regression → Binary Logistic |
| DV is ordinal (ranked categories) | **Ordinal logistic regression** | Analyze → Regression → Ordinal |
| DV is nominal with 3+ categories | **Multinomial logistic regression** | Analyze → Regression → Multinomial Logistic |

---

### 🚨 STILL CONFUSED? USE THIS CHEAT:

Ask yourself these 3 things:

```
1. HOW MANY variables do I have and what TYPE are they?
   - DV (the thing I'm measuring/outcome) → continuous or categorical?
   - IV (the groups/predictors) → how many? categorical or continuous?

2. HOW MANY GROUPS am I comparing?
   - 2 groups → t-test territory
   - 3+ groups → ANOVA territory
   - No groups, just 2 variables → correlation/regression territory

3. Are the groups INDEPENDENT or RELATED (same people)?
   - Different people → independent test
   - Same people → paired/repeated test
```

**If all else fails, look at this:**

| # of IVs | # of DVs | Type of DV | Groups independent? | → TEST |
|---|---|---|---|---|
| 1 categorical (2 groups) | 1 continuous | Scale | Yes | **Independent t-test** |
| 1 categorical (2 groups) | 1 continuous | Scale | No (same people) | **Paired t-test** |
| 1 categorical (3+ groups) | 1 continuous | Scale | Yes | **One-way ANOVA** |
| 1 categorical (3+ groups) | 1 continuous | Scale | No (same people) | **Repeated measures ANOVA** |
| 2 categorical | 1 continuous | Scale | Yes | **Two-way ANOVA** |
| 1 continuous | 1 continuous | Scale | N/A | **Pearson correlation** |
| 1+ continuous or categorical | 1 continuous | Scale | N/A | **Linear regression** |
| 1+ any | 1 binary | Nominal (2 levels) | N/A | **Logistic regression** |
| 1 categorical | 1 categorical | Nominal/Ordinal | Yes | **Chi-square** |
| 1 categorical (2 groups) | 1 ordinal | Ordinal | Yes | **Mann-Whitney U** |
| 1 categorical (3+ groups) | 1 ordinal | Ordinal | Yes | **Kruskal-Wallis** |

---

### STILL STILL confused? Answer literally just this:

> "I have [NUMBER] groups of [SAME/DIFFERENT] people and I'm measuring [A NUMBER / A CATEGORY]."

- 2 groups, different people, measuring a number → **Independent t-test**
- 2 groups, same people, measuring a number → **Paired t-test**
- 3+ groups, different people, measuring a number → **One-way ANOVA**
- 3+ groups, same people, measuring a number → **Repeated Measures ANOVA**
- No groups, 2 numbers, looking for relationship → **Correlation**
- No groups, predicting a number from other numbers → **Regression**
- Comparing categories to categories → **Chi-square**
- Any of the above but data is weird/ordinal → **Non-parametric version** (Mann-Whitney, Kruskal-Wallis, Spearman)

---

## SPSS QUICK REFERENCE

| What you want | SPSS Menu Path |
|---------------|----------------|
| Descriptives (mean, SD, etc.) | Analyze → Descriptive Statistics → Descriptives |
| Frequencies + Mode + Median | Analyze → Descriptive Statistics → Frequencies → Statistics |
| Independent t-test | Analyze → Compare Means → Independent-Samples T Test |
| Paired t-test | Analyze → Compare Means → Paired-Samples T Test |
| One-way ANOVA | Analyze → Compare Means → One-Way ANOVA |
| Two-way ANOVA | Analyze → General Linear Model → Univariate |
| Repeated Measures ANOVA | Analyze → General Linear Model → Repeated Measures |
| Pearson/Spearman Correlation | Analyze → Correlate → Bivariate |
| Linear Regression | Analyze → Regression → Linear |
| Chi-Square | Analyze → Descriptive Statistics → Crosstabs → Statistics → Chi-square |
| Mann-Whitney U | Analyze → Nonparametric Tests → Legacy Dialogs → 2 Independent Samples |
| Kruskal-Wallis | Analyze → Nonparametric Tests → Legacy Dialogs → K Independent Samples |
| Wilcoxon Signed-Rank | Analyze → Nonparametric Tests → Legacy Dialogs → 2 Related Samples |
| Check normality | Analyze → Descriptive Statistics → Explore → Plots → check Normality plots |
| Levene's test (equal variances) | Comes automatically with t-test output |

---

## READING SPSS OUTPUT (THE IMPORTANT BITS)

**For any test, you mainly need:**
1. **Test statistic** (t, F, χ², U, z — depends on the test)
2. **Degrees of freedom** (df)
3. **Sig. (2-tailed)** ← THIS IS YOUR P-VALUE
4. **Descriptives** (means, SDs for each group)

**Reporting format:** "There was a significant difference in sprint time between groups, F(2, 350) = 9.21, p < .001."

**If Levene's test is significant (p < .05):** Your groups have unequal variances → use the "Equal variances NOT assumed" row in the t-test output.

---

## GOLDEN RULES 🐕

1. **p < 0.05 ≠ important.** It just means "probably not zero." Always check effect size.
2. **Correlation ≠ causation.** Ice cream sales correlate with drownings. Summer causes both.
3. **More data = easier to get significance.** With 10,000 people, even a 0.01 difference becomes "significant."
4. **Check assumptions first** — normality, equal variances, independence. If violated → use non-parametric tests.
5. **"Fail to reject H₀" ≠ "H₀ is true."** You just didn't find enough evidence. Maybe need more data.
6. **Interaction first.** In two-way ANOVA, check the interaction term BEFORE interpreting main effects.
7. **Post-hoc after ANOVA.** A significant F just means "something differs." You need Tukey/Bonferroni to find WHAT.
8. **One-tailed vs two-tailed:** Two-tailed is safer and more common. Only use one-tailed if you predicted a specific direction BEFORE collecting data.

---

## 🤖 AI PROMPTS — Let the Robot Do It

If you have access to ChatGPT, Claude, Copilot, etc., here's the shortest prompt to get each thing done. Just paste your data after the prompt.

| Task | Shortest AI Prompt |
|------|-------------------|
| **Descriptives** | "Calculate the mean, median, mode, SD, and range for this data: [paste numbers]" |
| **Independent t-test** | "Run an independent samples t-test. Group A: [numbers]. Group B: [numbers]. Give me t, df, p-value, and Cohen's d." |
| **Paired t-test** | "Run a paired t-test. Before: [numbers]. After: [numbers]. Give me t, df, p, and whether it's significant at .05." |
| **One-way ANOVA** | "Run a one-way ANOVA with post-hoc Tukey. Group 1: [numbers]. Group 2: [numbers]. Group 3: [numbers]. Show F, p, and which groups differ." |
| **Two-way ANOVA** | "Run a two-way ANOVA. Factor A has levels [X, Y]. Factor B has levels [X, Y]. Data: [paste]. Report main effects, interaction, and F/p for each." |
| **Pearson correlation** | "Calculate Pearson's r and p-value. X: [numbers]. Y: [numbers]. Tell me strength, direction, and significance." |
| **Linear regression** | "Run a linear regression. DV: [numbers]. IV: [numbers]. Give me the equation, R², and p-value for the slope." |
| **Chi-square** | "Run a chi-square test of independence on this contingency table: [paste table]. Give me χ², df, p-value." |
| **Mann-Whitney U** | "Run a Mann-Whitney U test. Group A: [numbers]. Group B: [numbers]. Give me U, z, and p-value." |
| **Z-score** | "Convert these scores to z-scores: [numbers]. Mean = X, SD = Y." |
| **Normality check** | "Check if this data is normally distributed: [numbers]. Run Shapiro-Wilk and tell me if I should use parametric or non-parametric tests." |
| **Which test to use** | "I have [describe your data: # of groups, same/different people, type of DV]. What statistical test should I run and why?" |
| **Interpret output** | "Here's my SPSS output: [paste or describe]. Interpret it in plain English and write an APA-style results sentence." |
| **Full analysis** | "Here's my data: [paste]. My research question is: [question]. Pick the right test, run it, interpret the results, and write up the findings in APA format." |

**Pro tip:** If you're not sure what test to use, just dump your data and research question into the AI and say:

> "Here's my data. My research question is [X]. What test should I run? Run it. Interpret it. Write it up in APA format."

That one prompt does everything.

---

## ASSUMPTIONS CHECKLIST (Per Test)

| Test | Assumptions to check | What if violated? |
|------|---------------------|-------------------|
| **t-test** | DV is continuous, independence, normality (or n > 30), equal variances (Levene's) | Unequal variance → use "equal variances not assumed" row. Non-normal + small n → Mann-Whitney. |
| **One-way ANOVA** | DV continuous, independence, normality per group, homogeneity of variance | Unequal variance → use Welch's F. Non-normal → Kruskal-Wallis. |
| **Pearson correlation** | Both variables continuous, linearity, bivariate normality, no extreme outliers | Non-linear or ordinal → Spearman correlation. |
| **Chi-square** | Categorical variables, independence, expected frequencies ≥ 5 in each cell | Expected count < 5 → Fisher's Exact Test. |
| **Regression** | Linear relationship, normality of residuals, homoscedasticity, no multicollinearity | Check residual plots. Transform variables or use robust methods. |

**How to check normality in SPSS:** Analyze → Descriptive Statistics → Explore → Plots → check "Normality plots with tests." Look at Shapiro-Wilk (for n < 50) or Kolmogorov-Smirnov (for n ≥ 50). If Sig. > 0.05 → data is normal enough.

---

## HOW TO REPORT RESULTS (APA-ish Templates)

| Test | Template |
|------|----------|
| **Independent t-test** | "An independent-samples t-test showed a significant difference in [DV] between [group 1] (M = X, SD = X) and [group 2] (M = X, SD = X), t(df) = X.XX, p = .XXX, d = X.XX." |
| **Paired t-test** | "A paired-samples t-test showed a significant change in [DV] from pre-test (M = X, SD = X) to post-test (M = X, SD = X), t(df) = X.XX, p = .XXX." |
| **One-way ANOVA** | "A one-way ANOVA revealed a significant effect of [IV] on [DV], F(df between, df within) = X.XX, p = .XXX. Post-hoc Tukey tests showed [group A] differed from [group B] (p = .XXX)." |
| **Pearson correlation** | "There was a significant positive/negative correlation between [var 1] and [var 2], r(df) = .XX, p = .XXX." |
| **Chi-square** | "A chi-square test of independence showed a significant association between [var 1] and [var 2], χ²(df) = X.XX, p = .XXX." |

**Example full write-up:** "An independent-samples t-test indicated that current smokers (M = 7.12, SD = 1.08) had significantly slower sprint times than nonsmokers (M = 6.41, SD = 1.25), t(318) = 4.01, p < .001, d = 0.60."
