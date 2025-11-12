---
title: 'Kvasir SEG'
desc: 'Segmented Polyp Dataset for Computer Aided Gastrointestinal Disease Detection.'
thumbnail: /thumbnails/kvasir-seg.png
publication: https://dl.acm.org/doi/10.1007/978-3-030-37734-2_37
github: 
tags:
  - gastrointestinal
  - segmentation
---
Pixel-wise image segmentation is a highly demanding task in medical image analysis. It is difficult to find annotated medical images with corresponding segmentation mask. Here, we present Kvasir-SEG. It is an open-access dataset of gastrointestinal polyp images and corresponding segmentation masks, manually annotated and verified by an experienced gastroenterologist. This work will be valuable for researchers to reproduce results and compare their methods in the future. By adding segmentation masks to the Kvasir dataset, which until today only consisted of framewise annotations, we enable multimedia and computer vision researchers to contribute in the field of polyp segmentation and automatic analysis of colonoscopy videos.

The human gastrointestinal (GI) tract is made up of different sections, one of them being the large bowel. Several types of anomalies and diseases can affect the large bowel, such as colorectal cancer. Colorectal cancer is the second most common cancer type among women and third most common among men. Polyps are precursors to colorectal cancer, and is found in nearly half of the individuals at age 50 having a screening colonoscopy, and are increasing with age. Colonoscopy is the gold standard for detection and assessment of these polyps with subsequent biopsy and removal of the polyps. Early disease detection has a huge impact on survival from colorectal cancer, and polyp detection is therefore important. In addition, several studies have shown that polyps are often overlooked during colonoscopies, with polyp miss rates of 14%-30% depending on the type and size of the polyps. Increasing the detection of polyps has been shown to decrease risk of colorectal cancer. Thus, automatic detection of more polyps at an early stage can play a crucial role in improving both prevention of and survival from colorectal cancer. This is the main motivation behind the development of a Kvasir-SEG dataset.

## Kvasir-SEG Dataset Details
The Kvasir-SEG dataset (size 46.2 MB) contains 1000 polyp images and their corresponding ground truth from the Kvasir Dataset v2. The resolution of the images contained in Kvasir-SEG varies from 332x487 to 1920x1072 pixels. The images and its corresponding masks are stored in two separate folders with the same filename. The image files are encoded using JPEG compression, and online browsing is facilitated. The open-access dataset can be easily downloaded for research and educational purposes.

The bounding box (coordinate points) for the corresponding images are stored in a JSON file. This dataset is designed to push the state of the art solution for the polyp detection task.
Some examples of the dataset.

## Applications of the Dataset
The Kvasir-SEG dataset is intended to be used for researching and developing new and improved methods for segmentation, detection, localization, and classification of polyps. Multiple datasets are prerequisites for comparing computer vision-based algorithms, and this dataset is useful both as a training dataset or as a validation dataset. These datasets can assist the development of state-of-the-art solutions for images captured by colonoscopes from different manufacturers. Further research in this field has the potential to help reduce the polyp miss rate and thus improve examination quality. The Kvasir-SEG dataset is also suitable for general segmentation and bounding box detection research. In this context, the datasets can accompany several other datasets from a wide range of fields, both medical and otherwise.

## Ground Truth Extraction
We uploaded the entire Kvasir polyp class to Labelbox and created all the segmentations using this application. The Labelbox is a tool used for labeling the region of interest (ROI) in image frames, i.e., the polyp regions for our case. We manually annotated and labeled all of the 1000 images with the help of medical experts. After annotation, we exported the files to generate masks for each annotation. The exported JSON file contained all the information about the image and the coordinate points for generating the mask. To create a mask, we used ROI coordinates to draw contours on an empty black image and fill the contours with white color. The generated masks are a 1-bit color depth images. The pixels depicting polyp tissue, the region of interest, are represented by the foreground (white mask), while the background (in black) does not contain positive pixels. Some of the original images contain the image of the endoscope position marking probe, ScopeGuide TM, Olympus Tokyo Japan, located in one of the bottom corners, seen as a small green box. As this information is superfluous for the segmentation task, we have replaced these with black boxes in the Kvasir-SEG dataset.

## Suggested Metrics
There are different metrics for evaluating the performance of the architectures on the image segmentation dataset. For medical image segmentation task, the most commonly used ones are Dice coefficient and Intersection over Union (IOU). Based on related work in this field, we have used these metrics for the evaluation of the algorithms. In future work, we encourage the use of these metrics for evaluating the performance of the model. In the future, it might be even better to include as many as possible metrics for the fair comparison of the models.

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| kvasir-seg.zip | The kvasir-seg.zip archive containing the dataset. | 44.1MB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/kvasir-seg.zip) |
| kvasir-sessile.zip | The kvasir-sessile.zip archive containing the dataset. | 13.7MB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/kvasir-sessile.zip) |

## Cite

@inproceedings{jha2020kvasir,
    title={Kvasir-seg: A segmented polyp dataset},
    author={Jha, Debesh and Smedsrud, Pia H and Riegler, Michael A and Halvorsen, P{\aa}l and
    de Lange, Thomas and Johansen, Dag and Johansen, H{\aa}vard D},
    booktitle={International Conference on Multimedia Modeling},
    pages={451--462},
    year={2020},
    organization={Springer}
}

## Terms of use
The use of the Kvasir-SEG dataset is restricted for research and educational purposes. The use of the Kvasir-SEG dataset for commercial purposes is forbidden without prior written permission. For other purposes, contact us (see below). In all documents and publications that use the Kvasir-SEG dataset or report experimental results based on the Kvasir-SEG dataset, a reference to the dataset paper has to be included (see below). Please email debesh@simula.no if you have any questions regarding how to cite the dataset.

## Contact
Email debesh (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research!
