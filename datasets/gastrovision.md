---
title: 'GastroVision'
desc: 'A multicenter dataset.'
thumbnail: /thumbnails/gastrovision.jpeg
github: https://github.com/DebeshJha/GastroVision
hidden: false
tags:
  - gastrointestinal
  - images
---

This repository provides related links and codes for the GastroVision dataset, a multi-class endoscopy image dataset comprising the largest number of anatomical landmarks, pathological abnormalities, and normal findings in the gastrointestinal (GI) tract. A total of 36 such classes, with 6,169 images, are acquired from the upper and lower GI tracts.

The dataset can be downloaded using this link <https://osf.io/84e7f/>.

Alternatively, the dataset can also be downloaded using this link <https://drive.google.com/drive/folders/1T35gqO7jIKNxC-gVA2YVOMdsL7PSqeAa?usp=sharing>

- The metadata for the dataset can be found in **GastroVision_metadata.csv**, which contains the filename, class, width, height, and size of images.  
- The dataset split used in the paper is provided in the **Split** folder. This split contains 23 classes, as we performed experiments using classes with more than five samples. However, you can get the details of other classes from the **GastroVision_metadata.csv** file.  The users can use the provided split to reproduce the results presented in the paper and for a fair comparison.
- The code files used for the experiments reported in the paper are provided in the **Source** folder.

## Download
All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/84e7f/](https://osf.io/84e7f/)

## Cite
If you use this dataset in your research work, please cite the following paper:

```
@inproceedings{jha2023gastrovision,
  title={GastroVision: A Multi-class Endoscopy Image Dataset for Computer Aided Gastrointestinal Disease Detection},
  author={Debesh Jha*, Vanshali Sharma*, Neethi Dasu, Nikhil Kumar Tomar, Steven Hicks, M.K. Bhuyan, Pradip K. Das, Michael A. Riegler, P{\aa}l Halvorsen, Thomas de Lange, Ulas Bagci}
  booktitle={ICML Workshop on Machine Learning for Multimodal Healthcare Data (ML4MHD 2023)},
  year={2023}
}
```

## Contact
Please contact debesh.jha@northwestern.edu  & Vanshalisharma@iit.ac.in if you have questions about the dataset and our research activities. We always welcome collaboration and joint research!