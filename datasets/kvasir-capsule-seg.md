---
title: 'KvasirCapsule SEG'
desc: 'A Capsule Endoscopy Segmentation Dataset.'
thumbnail: /thumbnails/kvasir-capsule-seg.jpg
publication: https://arxiv.org/abs/2104.11138
github: https://github.com/DebeshJha/NanoNet
tags:
  - gastrointestinal
  - segmentation
---

Video capsule endoscopy (VCE) or capsule endoscopy is a non-invasive technology designed to provide diagnostic imaging of the small intestine. The patient swallows a capsule that moves through the digestive tract and captures thousands of images that physicians can further examine. Machine learning and deep learning-based algorithms are gaining popularity in improving the anomaly detection rate and decreasing manual labor for this specific application. To be able to create an efficient model, data is important. In this respect, we release KvasirCapsule-SEG, a publicly available dataset that can help design better segmentation algorithms in the field of VCE technology.

## Dataset Details
KvasirCapsule-SEG is an enchanced subset of Kvasir-Capsule which contains polyp images, their segmentation ground truth and bounding box information. The polyp class of Kvasir-Capsule has only 55 images which we annotated with the help of an expert gastroenterologist. As can be seen in the figure below, we have generated both ground truth and bounding box information with separate folders for images, ground truth, and images with bounding boxes. Examples of polyps and their corresponding masks from KvasirCapsule-SEG can be found here.

## Suggested Evaluation Metrics
For evaluation purposes, we suggest standard computer vision metrics such as dice coefficient (DSC), mean intersection over union (mIoU), Precision, Recall, Specificity, Accuracy, and FPS. A detailed description of these metrics can be found in our paper.

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| kvasir-capsule-seg.zip | The kvasir-capsule-seg.zip archive containing the dataset. | 2.66MB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/kvasir-capsule-seg.zip) |

## Cite
If you use this dataset in your research, Please cite the following paper:

    @inproceedings{jha2021nanonet,
      title     = {Nanonet: Real-time polyp segmentation in
        video capsule endoscopy and colonoscopy},
      author    = {
          Jha, Debesh and Tomar, Nikhil Kumar and Ali, Sharib and
          Riegler, Michael A and Johansen, H{\aa}vard D and Johansen, Dag and
          de Lange, Thomas and Halvorsen, P{\aa}l
      },
      booktitle = {Proceedings of the 2021 IEEE 34th International
        Symposium on Computer-Based Medical Systems (CBMS)},
      pages     = {37--43},
      year      = {2021}
    }

## Terms of use
The use of the KvasirCapsule-SEG dataset is restricted for research and educational purposes. The use of the KvasirCapsule-SEG dataset for commercial purposes is forbidden without prior written permission. For other purposes, contact us (see below). In all documents and publications that use the KvasirCapsule-SEG dataset or report experimental results based on the KvasirCapsule-SEG dataset, a reference to the dataset paper has to be included.

## Ethics approval
In this study, we used fully anonymized data approved by Privacy Data Protection Authority. It was exempted from approval from the Regional Committee for Medical and Health Research Ethics - South East Norway. Furthermore, we confirm that all experiments were performed in accordance with the relevant guidelines and regulations of the Regional Committee for Medical and Health Research Ethics - South East Norway, and the GDPR.

## Contact
Email debesh (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research! 