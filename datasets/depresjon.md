---
title: 'Depresjon'
desc: 'The Depresjon Dataset.'
thumbnail: /thumbnails/depresjon.png
publication: https://dl.acm.org/doi/10.1145/3204949.3208125
github: 
tags:
  - mental health
  - sensor
---

Wearable sensors measuring different parts of people's activity are a common technology nowadays. Data created using these devices holds a lot of potential besides measuring the quantity of daily steps or calories burned, since continuous recordings of heart rate and activity levels usually are collected. Furthermore, there is an increasing awareness in the field of psychiatry on how these activity data relates to various mental health issues such as changes in mood, personality, inability to cope with daily problems or stress and withdrawal from friends and activities. In this paper we present the analysis of a unique dataset containing sensor data collected from patients suffering from depression. The dataset contains motor activity recordings of 23 unipolar and bipolar depressed patients and 32 healthy controls. We apply machine learning to classify patients into depressed and nondepressed. For evaluation of the algorithms, leave one patient out validation is performed. The best results achieved are an F1 score of 0.73 and a MCC of 0.44. The overall findings show that sensor data contains information that can be used to determine the depression status of a person.

Depression is a severe mental disorder with characteristic symptoms like sadness, the feeling of emptiness, anxiety and sleep disturbance, as well as general loss of initiative and interest in activities. Additionally, features like the feeling of guilt or worthlessness, reduced energy, concentration problems, suicidality and psychotic symptoms might be present. The severity of a depression is determined by the quantity of symptoms, their seriousness and duration, as well as the consequences on social and occupational function. Depressions are also common in Bipolar disorder, another severe psychiatric disorder. The main difference between unipolar depression and bipolar disorder is the periodic occurrence of mania in the latter, a state associated with inﬂated self-esteem, impulsivity, increased activity, reduced sleep and goal-directed actions. Both diseases are genetic disorders, and might be understood as a genetic vulnerability to the environment disturbing the internal biological state and potentially trigger mood episodes. Depression is associated with disrupted biological rhythms caused by environmental disturbance like seasonal change in daylight, alteration of social rhythms due to for instance shiftwork or longitude traveling; besides linked to lifestyles associated with diurnal rhythms inconsistent with the natural daylight cycle. The appearance of depressive symptoms relates furthermore to physical health issues, medical side effects, life events and social factors, besides alcohol and substance abuse, and such factors might also potentially cause symptoms of depression in all humans. The global lifetime prevalence of depression is roughly 15%, but the incidences of episodes with a severity level not meeting the requirements for a depressive diagnosis are far more prevalent. Actigraph recordings of motor activity are considered an objective method for observing depression, although this topic is far from exhaustive studied within psychiatric research.

## Data Collection
The dataset was originally collected for the study of motor activity in schizophrenia and major depression https://bmcresnotes.biomedcentral.com/articles/10.1186/1756-0500-3-149. Motor activity was monitored with an actigraph watch worn at the right wrist (Actiwatch, Cambridge Neurotechnology Ltd, England, model AW4). The actigraph watch measures activity levels. The sampling frequency is 32Hz and movements over 0.05 g are recorded. A corresponding voltage is produced and is stored as an activity count in the memory unit of the actigraph watch. The number of counts is proportional to the intensity of the movement. Total activity counts were continuously recorded in one minute intervals.

## Dataset Details
The dataset contains the following: Two folders, whereas one contains the data for the controls and one for the condition group. For each patient we provide a csv file containing the actigraph data collected over time. The columns are: timestamp (one minute intervals), date (date of measurement), activity (activity measurement from the actigraph watch). In addition, we also provide the MADRS scores in the file \emph{scores.csv}. It contains the following columns; number (patient identifier), days (number of days of measurements), gender (1 or 2 for female or male), age (age in age groups), afftype (1: bipolar II, 2: unipolar depressive, 3: bipolar I), melanch (1: melancholia, 2: no melancholia), inpatient (1: inpatient, 2: outpatient), edu (education grouped in years), marriage (1: married or cohabiting, 2: single), work (1: working or studying, 2: unemployed/sick leave/pension), madrs1 (MADRS score when measurement started), madrs2 (MADRS when measurement stopped).

## Applications of the Dataset
Our vision is that the available data may eventually help researchers to develop systems capable of automatically detecting depression states based on sensor data. This dataset can be suitable (but not limited to) for the following applications: (i) Use machine learning for depression states classification; (ii) MADRS score prediction based on motor activity data and (iii) Sleep pattern analysis of depressed v.s. nondepressed participants. This dataset can be used as the basis for evaluating different machine learning methods and approaches such as: cost-sensitive classification and oversampling techniques for imbalanced class problems. This dataset is also suitable for comparing different machine learning classification approaches such as feature based and deep learning based methods like convolutional neural networks and recurrent neural networks for time series.

## Suggested Metrics
Looking at the list of related work in this area, there are a lot of different metrics used, with potentially different names when used in the medical area and the computer science (information retrieval) area. Here, we provide a small list of the most important metrics. For future research, in addition to describing the dataset with respect to total number of samples, it might be good to provide as many of the metrics below as possible in order to enable an indirect comparison with older work:
* True positive (TP)	The number of correctly identified samples. The number of frames with an endoscopic finding which correctly is identified as a frame with an endoscopic finding.
* True negative (TN)	The number of correctly identified negative samples, i.e., frames without an endoscopic finding which correctly is identified as a frame without an endoscopic finding.
* False positive (FP)	The number of wrongly identified samples, i.e., a commonly called a "false alarm". Frames without an endoscopic finding which is erroneously identified as a frame with an endoscopic finding.
* False negative (FN)	The number of wrongly identified negative samples. Frames without an endoscopic finding which erroneously is identified as a frame with an endoscopic finding.
* Recall (REC)	This metric is also frequently called sensitivity, probability of detection and true positive rate, and it is the ratio of samples that are correctly identified as positive among all existing positive samples.
* Precision (PREC)	This metric is also frequently called the positive predictive value, and shows the ratio of samples that are correctly identified as positive among the returned samples (the fraction of retrieved samples that are relevant).
* Specificity (SPEC)	This metric is frequently called the true negative rate, and shows the ratio of negatives that are correctly identified as such (e.g., the fraction of frames without an endoscopic finding are correctly identified as a negative result).
* Accuracy (ACC)	The percentage of correctly identified true and false samples.
* Matthews correlation coefficient (MCC)	MCC takes into account true and false positives and negatives, and is a balanced measure even if the classes are of very different sizes.
* F1 score (F1)	A measure of a test’s accuracy by calculating the harmonic mean of the precision and recall.

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| depresjon.zip | The depresjon.zip archive containing the dataset. | 5.39MB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/depresjon.zip) |

## Cite
    @inproceedings{Garcia:2018:NBP:3083187.3083216,
        title = {Depresjon: A Motor Activity Database of Depression Episodes in Unipolar and Bipolar Patients},
        author = {
            Enrique Garcia-Ceja and Michael Riegler and Petter Jakobsen and
            Jim T\o rresen and Tine Nordgreen and Ketil J. Oedegaard and
            Ole Bernt Fasmer
        },
        booktitle = {Proceedings of the 9th ACM on Multimedia Systems Conference},
        series = {MMSys'18},
        year = {2018},
        location = {Amsterdam, The Netherlands},
        url = {http://doi.acm.org/10.1145/3204949.3208125},
        doi = {10.1145/3204949.3208125},
        acmid = {3208125},
        publisher = {ACM},
        address = {New York, NY, USA}
    }
    
    
## Terms of use
In all documents and papers that report experimental results based on the Depresjon Dataset, a reference to this study should be included.

## Contact
Email enriqug (_at_) ifi (_dot_) uio (_dot_) no or michael (_at_) simula (_dot_) no if you have any questions about to the dataset and our research activities. We always welcome collaboration and joint research!