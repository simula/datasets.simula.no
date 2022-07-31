---
title: 'Medico Multimedia - VISEM Tracking'
desc: 'A sperm tracking dataset.'
thumbnail: /thumbnails/visem-qc.png
hidden: true
tags:
  - sperm
  - videos
---

*See the [MediaEval 2022 webpage](https://multimediaeval.github.io/editions/2022/) for information on how to register and participate.*

#### Task Description
The 2022 Medico task tackles the challenge of tracking sperm cells of video recordings of spermatozoa. The development dataset contains 20 videos, each one is 30 seconds long, a set of sperm characteristics (hormones, fatty acids data, etc.), frame-by-frame bounding box annotations, some anonymized study participants-related data, and motility and morphology data following the WHO guidelines. The goal is to encourage task participants to track individual sperms in real-time and combine different data sources to predict common measurements used for sperm quality assessment, specifically the motility (movement) spermatozoa (living sperm).

We hope that this task will encourage the multimedia community to aid in the development of computer-assisted reproductive health and discover new and clever ways of analyzing multimodal datasets. In addition to good analysis performance, an important aspect is also the efficiency of the algorithms due to the fact that the assessment of the sperm is performed in real-time and therefore requires real-time feedback.

For the task, we will provide a dataset of videos and other data from 20 different patients. Based on this data, the participants will be asked to address the following four subtasks:

* *Subtask 1: Sperm cell tracking* is real-time tracking of sperm cells in a given sperm videos. Tracking should be performed by predicting bounding box coordinates with the similar format to the bounding box coordinates provided with the development datasets. In this task, models should track sperm in each frame of a provided video in real-time. Therefore, frames per second is a important factor to measure. 

* *Subtask 2: Prediction of motility* in terms of the percentage of progressive and non-progressive spermatozoa is the second task. The prediction needs to be performed sample wise resulting in one value per sample per predicted attribute. Sperm tracking or bounding boxes predicted in the task 1 are required to use to solve the task. Motility is the ability of an organism to move independently, and where a progressive spermatozoon is able to "move forward", a non-progressive would move in circles without any forward progression. 

* *Subtask 3: Catch and highlight* task focus on identifying fastest sperm cells with corresponding average speed and highest top speed. One specific challenge with this subtask is that the video also changes the view on the sample. This happens because the sample is moved below the microscope to observe the complete sample area. Therefore, the tracking has to be performed per viewpoint on the sample. (Optional Subtask.)

* *Subtask 4: Explainability of predicitons* is perfomed in Subtasks 1 and/or 2 and/or 3 should be explained using machine learning explainable methods to convince domain experts about the final outputs. There is no any specific pre-requirements for this task. However, a report should be provided with explainable methods and corresponding results. (Optional Subtask.)
 
For both Subtasks 2 and 3, task-participants are asked to perform video analysis over single frame analysis. This is important due to the fact that single frame-based analysis will not be able to catch the movement of the spermatozoa (motility) which contains important information to perform the predictions on Subtasks 2 and 3.


#### Motivation and background
Manual evaluation of a sperm sample using a microscope is time-consuming and requires costly experts who have extensive training. In addition, the validity of manual sperm analysis becomes unreliable due to limited reproducibility and high inter-personnel variations due to the complexity of tracking, identifying, and counting sperms in fresh samples. The existing computer-aided sperm analyzer systems are not working well enough for application in a real clinical setting due to unreliability caused by the consistency of the semen sample. Therefore, we need to research new methods for automated sperm analysis. 

#### Target group
The task is of interest to researchers in the areas of machine learning (classification), visual content analysis and multimodal fusion. Overall, this task is intended to encourage the multimedia community to help improve the health care system through application of their knowledge and methods to reach the next level of computer and multimedia assisted diagnosis, detection and interpretation. 

#### Data
The task uses the data set VISEM [2], which contains data from 85 male participants aged 18 years or older. For this task, we have selected only 30 seconds video clips from selected 20 videos. For each participant, we include a set of measurements from a standard semen analysis, a video of live spermatozoa, a sperm fatty acid profile, the fatty acid composition of serum phospholipids, study participants-related data, and WHO analysis data. The dataset contains 20 videos, with each video has 30 seconds duration with corresponding bounding box coordinates. Each video has a resolution of 640x480 and runs at 50 frames-per-second. The dataset contains in total six CSV files (five for data and one which maps video IDs to study participants' IDs), a description file, and  folders containing the videos and bounding box data. The name of each video file contains the video's ID, the date it was recorded, and a small optional description. Then, the end of the filename contains the code of the person who assessed the video. Furthermore, VISEM contains five CSV files for each of the other data provided, a CSV file with the IDs linked to each video, and a text file containing * descriptions of some of the columns of the CSV files. One row in each CSV file represents a participant. The provided CSV files are:
* semen_analysis_data: The results of standard semen analysis.
* fatty_acids_spermatozoa: The levels of several fatty acids in the spermatozoa of the participants.
* fatty_acids_serum: The serum levels of the fatty acids of the phospholipids (measured from the blood of the participant).
* sex_hormones: The serum levels of sex hormones measured in the blood of the participants.
* study_participant_related_data: General information about the participants such as age, abstinence time, and Body Mass Index (BMI).
* videos: Overview of which video file belongs to what participant.

All Study participants agreed to donate their data for the purpose of science and provided the necessary consent for us to be able to distribute the data (checked and approved by the Norwegian data authority and ethical committee).

#### Ground truth
The ground truth data provided in this task were prepared by expert computer scientists and verified by domain experts.

#### Evaluation methodology
For the evaluation, we will use mAP (mean average precision), mean squared error, mean absolute error, frames per seconds and the mean absolute percentage error for the first two subtasks. For the optional third and fourth task, we will use manual evaluation with the help of three different experts within human reproduction.  

#### Quest for insight
Here are several research questions related to this challenge that participants can strive to answer in order to go beyond just looking at the evaluation metrics: 
<!-- The other quesitons are much better than this first question in going beyond the task evaluation metrics 
* How accurate are deep learning methods for identifying sperms in a fresh sample?-->
* Will continued tracking of sperm help to analyze the motility level of sperm samples?
* How do we calculate the average speed of moving sperms, and how to track the fastest one among many moving sperms?
* How can we best communicate to doctors about the accuracy, reliability, and trustworthiness of the output of Deep Learning methods?

#### Participant information
Please contact your task organizers with any questions on these points. 
* Signing up: Fill in the [registration form](https://forms.gle/JcKoa5ycxR2KEiTJ7) and fill out and return the [usage agreement](https://multimediaeval.github.io/editions/2022/docs/MediaEval2022_UsageAgreement.pdf).
* Making your submission: To be announced (check the task read me) <!-- Please add instructions on how to create and submit runs to your task replacing "To be announced." -->
* Preparing your working notes paper: Instructions on preparing you working notes paper can be found in [MediaEval 2022 Working Notes Paper Instructions](https://docs.google.com/document/d/12uSn0rRYxa3buiFNEbpa46dKsHOyqV2PHU_joRGMHRw).

#### References and recommended reading
[1] Riegler, Michael, et al. "Multimedia and Medicine: Teammates for Better Disease Detection and Survival." Proceedings of the 2016 ACM on Multimedia Conference. ACM, 2016.

[2] Trine B. Haugen, Steven A. Hicks, Jorunn M. Andersen, Oliwia Witczak, Hugo L. Hammer, Rune Borgli, Pål Halvorsen, and Michael Riegler. 2019. VISEM: a multimodal video dataset of human spermatozoa. In Proceedings of the 10th ACM Multimedia Systems Conference (MMSys '19). Association for Computing Machinery, New York, NY, USA, 261–266. DOI:https://doi.org/10.1145/3304109.3325814

[3] Hicks, S.A., Andersen, J.M., Witczak, O. et al. Machine Learning-Based Analysis of Sperm Videos and Participant Data for Male Fertility Prediction. Sci Rep 9, 16770 (2019). https://doi.org/10.1038/s41598-019-53217-y

[4] Thambawita, V., Halvorsen, P., Hammer, H., Riegler, M., & Haugen, T. B. (2019). Stacked dense optical flows and dropout layers to predict sperm motility and morphology. arXiv preprint arXiv:1911.03086.

[5] Thambawita, V., Halvorsen, P., Hammer, H., Riegler, M., & Haugen, T. B. (2019). Extracting temporal features into a spatial domain using autoencoders for sperm video analysis. arXiv preprint arXiv:1911.03100.



## Download
| File | Description | Size | Download
| --- | --- | --- | :---: |

## Contact
Email vajira (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research! 
