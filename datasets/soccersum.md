---
title: 'SoccerSum'
desc: 'The SoccerSum Dataset for Automated Detection, Segmentation, and Tracking of Objects on the Soccer Pitch'
thumbnail: /thumbnails/soccersum.jpeg
github: https://github.com/simula/SoccerSum
publication: ---
hidden: false
tags:
  - text
  - soccer
  - football
---

# SoccerSum Dataset

This page provides an overview of the SoccerSum Dataset, which was described in the dataset paper "The SoccerSum Dataset for Automated Detection, Segmentation, and Tracking of Objects on the Soccer Pitch" and used for the demo paper "Multimodal AI-Based Summarization and Storytelling for Soccer on Social Media" (see [Citations](#citations)). 

The SoccerSum dataset was curated by capturing and annotating soccer videos from the Norwegian Eliteserien league. This collection spans three years, covering 2021, 2022, and 2023. It comprises 750 frames from 41 unique sequences, with 4 to 40 frames per sequence, carefully chosen to represent a diverse selection of scenarios encountered in professional soccer games.

## Dataset Overview

The SoccerSum Dataset can be used for two primary tasks:

1. **Soccer Object Detection**
2. **Soccer Pitch Segmentation**

### Soccer Object Detection

For the object detection task, the dataset includes the following eight classes:

- `0` = Player
- `1` = Goalkeeper
- `2` = Referee
- `3` = Ball
- `4` = Logo
- `5` = Penalty Mark
- `6` = Corner Flagpost
- `7` = Goal Net

### Soccer Pitch Segmentation

For the segmentation task, the dataset includes the following two classes:

- `0` = Penalty Box
- `1` = Goal Box


### Use Cases

#### Detection and Segmentation

<p align="center">
  <img src="https://raw.githubusercontent.com/simula/datasets.simula.no/main/public/images/soccersum/Det_exp_2.jpg" alt="SoccerSum Detection Example" style="width: 45%;">
  <img src="https://raw.githubusercontent.com/simula/datasets.simula.no/main/public/images/soccersum/Seg_exp_1.jpg" alt="SoccerSum Segmentation Example" style="width: 45%;">
</p>

#### Tracking

<p align="center">
  <img src="https://raw.githubusercontent.com/simula/datasets.simula.no/main/public/images/soccersum/tracking-gif-soccersum.gif" alt="SoccerSum Tracking Frame 1" style="width: 70%;">

</p>

## Accessing the Dataset

The dataset is available on Zenodo: https://zenodo.org/records/10612084.

## Additional Resources

Additional resources related to SoccerSum can be found under: https://github.com/simula/SoccerSum/.

## Terms of Use

The dataset is fully open for research and educational purposes. Use of the dataset for competitions or commercial purposes requires prior written permission. References to the related articles must be included in all documents and papers that use, refer to, or report experimental results from this dataset.

## Citations

### MMSys 2024 ODS Track Paper

<pre><code>
@incollection{Houshmand_MMSYS_ODS,
  author = {Houshmand Sarkhoosh, Mehdi and Midoglu, Cise and Shafiee Sabet, Saeed and Halvorsen, P{\aa}l},
  title = {{The SoccerSum Dataset for Automated Detection, Segmentation, and Tracking of Objects on the Soccer Pitch}},
  booktitle = {{MMSys'24 : The 15th ACM Multimedia Systems Conference}},
  year = {2024},
  month = apr,
  date = {2024-04-15},
  urldate = {2024-04-15},
  isbn = {979-8-4007-0412-3/24/04},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  doi = {10.1145/3625468.3652180}
}
</code></pre>

### MMSys 2024 Demo Track Paper

<pre><code>
@incollection{Houshmand_MMSYS_demo,
  author = {Houshmand Sarkhoosh, Mehdi and Midoglu, Cise and Shafiee Sabet, Saeed and Halvorsen, P{\aa}l},
  title = {{Multimodal AI-Based Summarization and Storytelling for Soccer on Social Media}},
  booktitle = {{MMSys'24 : The 15th ACM Multimedia Systems Conference}},
  year = {2024},
  month = apr,
  date = {2024-04-15},
  urldate = {2024-04-15},
  isbn = {979-8-4007-0412-3/24/04},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  doi = {10.1145/3625468.3652197}
}
</code></pre>


## Contact

For any questions regarding the dataset, or to discuss potential collaboration and joint research opportunities, please contact the following people:

- Mehdi Houshmand: [mehdihou@oslomet.no](mailto:mehdihou@oslomet.no)
- Cise Midoglu: [cise@simula.no](mailto:cise@simula.no)
- Pål Halvorsen: [paalh@simula.no](mailto:paalh@simula.no)
