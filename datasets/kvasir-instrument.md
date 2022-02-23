---
title: 'Kvasir Instrument'
desc: 'A gastrointestinal instrument Dataset.'
thumbnail: /thumbnails/kvasir-instrument.jpg
publication: https://link.springer.com/chapter/10.1007/978-3-030-67835-7_19
tags:
  - gastrointestinal
  - sgementation
---

Gastrointestinal (GI) tract pathologies are screened, biopsied, and resected (if needed) periodically using surgical tools. However, these biopsied and/or resected areas are not tracked due to which the video analysis for assessing disease burden or the amount of pathology resection remains unknown. To tackle such issues, we have released the novel “Kvasir-Instrument: Diagnostic and therapeutic tool segmentation dataset in gastrointestinal endoscopy” dataset, which consists of 590 annotated frames comprising of GI procedure tools such as snares, balloons, biopsy forceps, etc. By adding segmentation masks and bounding boxes information to this dataset, we enable computer vision and GI endoscopy researchers to contribute to the field of automated tool segmentation.

## Dataset Details
The Kvasir-Instrument dataset (size 170 MB) contains 590 endoscopic tool images and their ground truth mask. The resolution of the image in the dataset varies from 720x576 to 1280x1024. The image file is encoded using jpeg compression. To the best of our knowledge, this is the first attempt to provide the GI tract organ tools dataset. The open-access dataset can be easily downloaded for research and educational purposes. To facilitate the training and testing on the same dataset, we also provide a train-test split so that researchers can build the methods and improve the results using the same dataset. The bounding box information (box coordinates (x, y, width, height)) for the corresponding images are stored in a JSON file. The dataset is designed to push the state-of-the-art solution for the automatic tool segmentation in gastrointestinal endoscopy.

## Applications of the Dataset
The Kvasir-Instrument is intended to be used for researching and developing new algorithms for image segmentation, detection, and localization tasks. We have provided a separate file for training and validation which will assist in the development of approaches across the same dataset.

## Annotation Protocol
We took a three-step strategy during annotation. First, the selected dataset samples were labeled by two experienced research assistants. These annotations were sent to the expert gastroenterologist for the verification. Finally, the suggested changes were incorporated, and the images were validated for those samples.

## Suggested Metrics for Segmentation
We suggest calculating the dice similarity coefficient (DSC) and Jaccard index or Intersection over Union (IoU) for the segmentation task. The other standard metrics for medical image segmentation are precision, recall, and overall accuracy. We also suggest calculating these metrics.

## Suggested Metrics for Detection and Localization
For the detection and localization task, we suggest calculating the average precision at different IoU thresholds. Usually, AP at IoU threshold of 50 is taken for evaluation of this dataset. We also recommend calculating overall IoU.

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| kvasir-instrument.zip | The kvasir-instrument.zip archive containing the dataset. | 170MB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/kvasir-instrument.zip) |

All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/kp6my](https://osf.io/kp6my)

## Cite
    @inproceedings{10.1007/978-3-030-67835-7_19,
        title = {Kvasir-Instrument: Diagnostic and Therapeutic
            Tool Segmentation Dataset in Gastrointestinal Endoscopy},
        author = {
            Jha, Debesh and Ali, Sharib and Emanuelsen, Krister and Hicks, Steven A. and
            Thambawita, Vajira and Garcia-Ceja, Enrique and Riegler, Michael A. and
            de Lange, Thomas and Schmidt, Peter T. and Johansen, H{\aa}vard D. and
            Johansen, Dag and Halvorsen, P{\aa}l 
        },
        booktitle = {MultiMedia Modeling},
        year = {2021},
        publisher = {Springer International Publishing},
        address = {Cham},
        pages = {218--229},
    }

## Terms of use
The use of the Kvasir-instrument dataset is restricted to research and education purposes. The use of the dataset is forbidden for commercial use without prior written permission. For other purposes, contact us (see below). In all documents and publications that use the Kvasir-SEG dataset or report experimental results based on the Kvasir-Instrument dataset, a reference to the dataset paper has to be included (see above). Please email debesh@simula.no if you have any questions regarding how to cite the dataset.

## Ethics approval
In this study, we used fully anonymized data approved by Privacy Data Protection Authority. It was exempted from approval from the Regional Committee for Medical and Health Research Ethics - South East Norway. Furthermore, we confirm that all experiments were performed in accordance with the relevant guidelines and regulations of the Regional Committee for Medical and Health Research Ethics - South East Norway, and the GDPR.

## Contact
Email debesh (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research! 