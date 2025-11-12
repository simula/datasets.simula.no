---
title: 'VISEM'
desc: 'A Multimodal Video Dataset of Human Spermatozoa.'
thumbnail: /thumbnails/visem.png
publication: https://dl.acm.org/doi/10.1145/3304109.3325814
github: 
tags:
  - sperm
  - videos
---

Real multimedia datasets that contain more than just images or text are rare. Even more rare are open multimedia datasets in medicine. Often, clinically related datasets only consist of image or videos. Here, we present a dataset that is novel in two ways. Firstly, it is a multi-modal dataset containing different data sources such as videos, biological analysis data, and participant data. Secondly, it is the first dataset of that kind in the field of human reproduction. It consists of anonymized data from 85 different participants. We hope this dataset will inspire people to apply their knowledge in this important field, generate shareable results in the domain, and ultimately improve human infertility investigation and treatment.

Sperm-related data faces the same problems as other clinical datasets. First of all, it is often difficult to share data due to legal requirements. Secondly, the knowledge about what the data contains and which are interesting medical research questions are often hard to find for researchers not familiar with the field. Finally, datasets are often also small compared to what would be effective for a proper analysis and evaluation of the results. We try to tackle the above-mentioned challenges by providing a clinical dataset in an open and explained way to experts not familiar with the medical field. The goal is to encourage these researchers to explore a new and exciting medical domain and contribute to the society with their research. In addition, we encourage comparable and open research also in the medical field where data access is usually difficult and often restricted to a limited number of researchers. To the best of our knowledge, the dataset contains more samples and far more attributes per participant than any sperm dataset openly available today. The dataset opens up for a wide range of new and interesting analyses, and a proper and fair comparison between different methods, both from a medical and a multimedia perspective.

## Data Collection
The presented data was originally collected for studies on how overweight and obesity relate to the male reproductive function. Participants in the study were males aged 18 years or older and were recruited between 2008 and 2013 from the normal population through advertisements in newspapers and weight loss programs, and patients from obesity and fertility clinics. Further details on the recruitment have been described previously by Andersen et al. The study was approved by the Regional Committee for Medical and Health Research Ethics, South East, Norway, and all participants provided written informed consent. The project was closed in December of 2017, and all data was anonymized. Participants in the study provided semen samples, and standard semen analysis was performed according to WHO recommendation, including assessment of sperm motility, sperm concentration and total sperm count, ejaculate volume, sperm morphology, and sperm vitality. For video recording for sperm motility, a sample was placed on a heated microscope stage (37 degree C) and examined under a 400 times magnification using an Olympus CX31 microscope. Videos were captured by a microscope mounted camera (specifically a UEye UI-2210C made by IDS Imaging Development Systems in Germany) and saved as an AVI file. Motility analysis was performed based on the videos. Fatty acids from spermatozoa and serum phospholipids were extracted from the samples and analyzed by gas chromatography. Sex hormones were measured in blood samples. Additionally, AMH was measured in seminal plasma. For the association studies, multiple linear regression and partial correlation were used for statistical analyses, with SPSS Statistics 20 as the analysis tool.

## Dataset Details
VISEM contains data from 85 male participants aged 18 years or older. For each of the participants, parameters from a standard semen analysis, a video of live spermatozoa, sperm fatty acid profile, the fatty acid composition of phospholipids of serum, demographic data and WHO analysis data are available. For some participants, two video files were made since there was a drift in the first sample recorded. This makes it difficult for the laboratory personnel to assess the motility. We decided to only include one video per participant due to dataset size concerns. The dataset contains over 35 gigabytes of videos, with each video lasting between two to seven minutes. The resolution of the videos is $640 \times 480$, and the frame-rate is 50 frames per second. The dataset contains in total six CSV-files (five for data and one for the video to participant ID mapping), a description file, and a video folder, Each of the video files is named with an ID, the date of video capture and a small optional description. Then, the end of the filename contains the code of the person who assessed the video using the WHO standard. Further, VISEM contains five CSV-files for each of the other data provided, a CSV-file with the IDs linked to each their video, and a text file containing descriptions of some of the columns of the CSV-files. One row in each CSV-file represents a participant.

The provided CSV-files are:

* **semen_analysis_data:** The results of standard semen analysis.
* **fatty_acids_spermatozoa:** The levels of several fatty acids in the spermatozoa of the participants.
* **fatty_acids_serum:** The serum levels of the fatty acids of the phospholipids (measured from the blood of the participant).
* **sex_hormones:** The serum levels of sex hormones measured in blood of the participants.
* **participant_related_data:** General information about the participants such as age, abstinence time and Body Mass Index (BMI).
* **videos:** Overview of which video-file belongs to what participant.

## Applications of the Dataset
We hope that this dataset may help researchers develop new methods for automatically detecting and predicting different aspects of human fertility. For example, predicting the motility and morphology of sperms would go a long way in reducing a doctor's workload. Motility and morphology are key attributes for determining the quality of a given sperm sample. Motility tells us something about the individual movement of each sperm, while morphology tells us something about the shape and form of the sperm cells. Another potential use-case is tracking individual sperms in real-time using the presented videos or perform semen quality analysis using the included fatty acid data. Furthermore, using the data collected from the WHO analysis, semen quality could be presented as a classification task. Some possible research questions which could be interesting to address using this dataset are (but not limited to):

* Is it possible to perform real-time tracking of spermatozoa in the videos. This could be very helpful for medical personnel to keep track of spermatozoa during the analysis.
* Is it possible to predict motility or morphology attributes from the videos only? This could save medical personnel a lot of time used to perform a manual analysis.
* Can a combination of different data sources improve the performance of prediction or tracking? This could be interesting in the sense of improving the performance in general but also to find new connections within the different modalities.
* How are different data sources related to semen quality? For example, are certain fatty acids related to semen quality and how? This could be very helpful to improve current knowledge and treatment but also to find completely new medical evidence.

In addition to these possible research questions, the dataset will hopefully inspire researchers to approach even more possible applications and research directions. Possible directions could be for example be in the fields of segmentation, video analysis, information retrieval, machine learning, object detection, computer vision, data fusion, and medical multimedia systems. Another important aspect is that the Visem dataset also allows an easy and fair comparison between different methods. This is often a challenge in health-related data since the data is often restricted due to legal issues. Therefore, being one of the first open medical multi-modal datasets available to the multimedia community, we encourage researchers to explore the dataset with their methods and skills. 

## Download
| File | Description | Size | Download
| --- | --- | --- | :---: |
| visem.zip  | The entire visem.zip dataset in one zip file. | 35.2GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/visem.zip) |

## Cite
    @inproceedings{10.1145/3304109.3325814,
        title = {VISEM: A Multimodal Video Dataset of Human Spermatozoa},
        author = {
            Haugen, Trine B. and Hicks, Steven A. and Andersen, Jorunn M. and
            Witczak, Oliwia and Hammer, Hugo L. and Borgli, Rune and
            Halvorsen, P\r{a}l and Riegler, Michael
        },
        year = {2019},
        publisher = {Association for Computing Machinery},
        address = {New York, NY, USA},
        doi = {10.1145/3304109.3325814},
        booktitle = {Proceedings of the 10th ACM Multimedia Systems Conference},
        pages = {261–266},
        numpages = {6},
        location = {Amherst, Massachusetts},
        series = {MMSys '19}
    }

## Terms of use
The use of the Visem dataset is restricted for research and educational purposes only. The use of the Visem dataset for other purposes including commercial purposes is forbidden without prior written permission. In all documents and papers that use or refer to the Visem dataset or report experimental results based on the Visem dataset, a reference to the dataset paper have to be included: https://dl.acm.org/doi/10.1145/3304109.3325814.

## Contact
Email michael (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research! 
