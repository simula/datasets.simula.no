---
title: REST
desc: >-
  Sleep, actigraphy and lifestyle data from 21 elite female football athletes
  over 17 days.
thumbnail: /thumbnails/rest.png
publication: 'https://doi.org/10.1038/s41597-025-06331-8'
github: 'https://github.com/simula/REST'
domain:
  - sports
  - health
modality:
  - sensor
tasks:
  - classification
  - forecasting
---

**REST** (Exploring Sleep Patterns and Influencing Factors in Elite Female Football Athletes) is a dataset of 21 elite female football athletes from a single Norwegian club, recorded over 17 days in spring 2023. It combines wrist-worn actigraphy with daily reports on well-being, caffeine consumption, screen time and a morning handgrip strength test. The aim is to support research on how training load, caffeine and evening light exposure affect sleep duration and quality, and to help build personalised training and recovery models.

Introduced in the paper:  
📄 **"REST, Exploring Sleep Patterns and Influencing Factors in Elite Female Football Athletes"**  
📰 *Scientific Data 13, 546 (2026)*  
→ [Paper (doi:10.1038/s41597-025-06331-8)](https://doi.org/10.1038/s41597-025-06331-8)  
→ [Code (preprocessing, sleep annotation and technical validation)](https://github.com/simula/REST)

## Dataset Summary

| Component | Details |
|-----------|---------|
| **Participants** | 21 elite female football athletes (age 23.91 ± 4.64, range 17–34) |
| **Duration** | 17 days |
| **Sensor** | ActiGraph™ wGT3X-BT, wrist-worn, 3-axis acceleration at 100 Hz |
| **Actigraphy** | 30-second epochs, one file per participant, 48,480 records each |
| **Daily reports** | 273 responses, 29 variables (subjective reports + sensor-derived sleep metrics) |
| **Initial questionnaire** | Demographics and the Athlete Sleep Behaviour Questionnaire (ASBQ) |
| **Format** | CSV |
| **Size** | ~44 MB (`REST.zip`) |
| **License** | CC BY 4.0 |

## Data Collection

- **Actigraphy:** An ActiGraph™ wGT3X-BT sensor was worn on the most convenient wrist for the whole study. It was taken off during football training, matches and activities with extensive water contact. The raw acceleration was band-pass filtered and summed into activity counts per 30-second epoch for each axis and the vector magnitude.
- **Initial questionnaire:** A one-time questionnaire with demographic questions and the 18-item Athlete Sleep Behaviour Questionnaire (ASBQ), answered on a 1–5 Likert scale.
- **Daily questionnaire:** Filled out each morning for the previous day. It covers perceived sleep duration and quality, screen time in the hour before sleep, and caffeine intake (units of energy drinks, cola, coffee, tea and espresso, plus the time of the last intake).
- **Team monitoring (XPS™):** Match days (MD-X periodisation), readiness, fatigue, soreness and up to two soreness locations.
- **Handgrip strength:** Measured each morning on the dominant hand with a handheld dynamometer, in kilograms.

## Sleep Annotation

Each actigraphy file contains sleep/wake predictions from several sleep detection methods: Cole-Kripke, Sadeh, Oakley, a hidden Markov model, and an LSTM trained on the Multi-Ethnic Study of Atherosclerosis (MESA), which has polysomnography-labelled actigraphy. A threshold-based algorithm also marks non-wear time. Sleep states are coded as `s` (sleep), `w` (wake) and `n` (non-wear).

## Dataset Structure

| File | Contents |
|------|----------|
| `initial-questionnaire-responses.csv` | Responses to the initial questionnaire for all participants |
| `daily-responses.csv` | One row per participant and day, with subjective responses and sensor-derived sleep metrics (total sleep time, sleep onset/offset, number of sleep intervals, longest sleep interval, etc.) |
| `actigraphy/<participant-id>.csv` | 30-second epochs with `x`, `y`, `z`, `vm`, `time`, `weekday` and the sleep annotation columns `CK`, `Oakley`, `Sadeh`, `fourier_HMM`, `LSTM` |

To protect participants' privacy, all dates have been removed. They are replaced by weekday indicators, and 24-hour timestamps are kept.

## Download

The dataset is available on Zenodo: [https://doi.org/10.5281/zenodo.16937033](https://doi.org/10.5281/zenodo.16937033)

## Terms of Use

The dataset is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).

## Cite

```bibtex
@article{Boeker2026REST,
  author = {Boeker, Matthias and Alexandersen, Andreas and Thambawita, Vajira and Midoglu, Cise and Johansen, Dag and Riegler, Michael A. and Halvorsen, P{\aa}l},
  title = {{REST, Exploring Sleep Patterns and Influencing Factors in Elite Female Football Athletes}},
  journal = {Scientific Data},
  volume = {13},
  pages = {546},
  year = {2026},
  doi = {10.1038/s41597-025-06331-8}
}
```

## Contact

Please contact [matthias@simula.no](mailto:matthias@simula.no) for any questions regarding the dataset.
