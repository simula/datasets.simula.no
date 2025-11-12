---
title: 'European Cloud Cover'
desc: 'A dataset containing reanalysis data from ERA5 and satellite retrievals from METeosat Second Generation.'
thumbnail: /thumbnails/european-cloud-cover.jpg
publication: https://www.mdpi.com/2504-2289/5/4/62/pdf
github: 
tags:
  - climate change
  - sensor
---

Climate change is stated as one of the biggest challenges of our time resulting in many unwanted effects. The response of cloud fractional cover (CFC), i.e. the portion of the sky covered by clouds, to future climate is associated with high uncertainties. CFC will affect the rate of global warming and different parts of the society such as agriculture and solar energy production.

However unfortunately, projection of future CFC is challenging. Here we present the European Cloud Cover dataset that connects variables that usually are well projected by numerical climate models (temperature, pressure and specific and relative humidity) and CFC. The dataset can thus be used to potentially improve the projections of future CFC and again improve projection of future global warming and other climate effects. The data to compute the CFC are obtained from the The European Organisation for the Exploitation of Meteorological Satellites data portal and the other variables from European Centre for Medium-Range Weather Forecasts.

Given the large amounts of data (17 GB) with high spatial and temporal resolution and the complexities of cloud formations, we believe that machine learning can be useful to learn the relation between CRC and the other variables. To the best of our knowledge this is the first dataset of this kind.

## Dataset Details
KvasirCapsule-SEG is an enchanced subset of Kvasir-Capsule which contains polyp images, their segmentation ground truth and bounding box information. The polyp class of Kvasir-Capsule has only 55 images which we annotated with the help of an expert gastroenterologist. As can be seen in the figure below, we have generated both ground truth and bounding box information with separate folders for images, ground truth, and images with bounding boxes. Examples of polyps and their corresponding masks from KvasirCapsule-SEG can be found here.

## Suggested Evaluation Metrics
For evaluation purposes, we suggest standard computer vision metrics such as dice coefficient (DSC), mean intersection over union (mIoU), Precision, Recall, Specificity, Accuracy, and FPS. A detailed description of these metrics can be found in our paper.

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| ecc.zip | The ecc.zip archive containing the dataset. | 17GB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://osf.io/kqdgx/) |

All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/kqdgx](https://osf.io/kqdgx)

## Cite
If you use this dataset in your research, Please cite the following paper:

    @article{svennevik2021prediction,
      title={Prediction of cloud fractional cover using machine learning},
      author={
        Svennevik, Hanna and Riegler, Michael A and Hicks, Steven and
        Storelvmo, Trude and Hammer, Hugo L
      },
      journal={Big Data and Cognitive Computing},
      volume={5},
      number={4},
      pages={62},
      year={2021},
      publisher={Multidisciplinary Digital Publishing Institute}
    }

## Terms of use
To download the dataset you must agree that the dataset will only be used for personal, educational or research purposes. More detailed information about terms of use is given here:

**Terms of use: https://eoportal.eumetsat.int/userMgmt/terms.faces**

**Data Usage: https://eoportal.eumetsat.int/userMgmt/dataUsageHelp.faces**

## Contact
Email michael (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research! 
