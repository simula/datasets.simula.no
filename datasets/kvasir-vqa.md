---
title: 'Kvasir-VQA'
desc: 'A Text-Image Pair GI Tract Dataset'
thumbnail: /thumbnails/kvasir.jpg # change
publication: 
tags:
  - gastrointestinal
  - images
  - VQA
---
<!-- # Kvasir-VQA: A Text-Image Pair GI Tract Dataset -->


The Kvasir-VQA dataset is an extended dataset derived from the HyperKvasir and Kvasir-Instrument datasets, augmented with question-and-answer annotations. This dataset is designed to facilitate advanced machine learning tasks in gastrointestinal (GI) diagnostics, including image captioning, Visual Question Answering (VQA) and text-based generation of synthetic medical images



### Download
You can downlod the dataset from HuggingFace:
[https://huggingface.co/datasets/SushantGautam/kvasir-vqa](https://huggingface.co/datasets/SushantGautam/kvasir-vqa)

<iframe
  src="https://huggingface.co/datasets/SushantGautam/kvasir-vqa/embed/viewer/main_data/raw_annotations"
  frameborder="0"
  width="100%"
  height="560px"
></iframe>

### Key Features

- **Total Images**: 6,500 annotated images
- **Annotations**: Includes question-and-answer pairs for each image
- **Question Types**: Yes/No, single-choice, multiple-choice, color-related, location-related, numerical count
- **Applications**: Image captioning, VQA, synthetic medical image generation, object detection, etc


## Dataset Details

### Image Categories

The dataset includes images from various GI tract conditions and medical instruments used in GI procedures:

| **Image Category**          | **Number of Samples** |
|-----------------------------|-----------------------|
| Normal Images               | 2500                  |
| HyperKvasir-Polyps          | 1000                  |
| HyperKvasir-Esophagitis     | 1000                  |
| HyperKvasir-Ulcerative Colitis | 1000               |
| Kvasir-Instrument           | 1000                  |
| **Total**                   | **6500**              |

### Annotation Process

Annotations were developed with input from medical professionals and include six types of questions:

- **Yes/No Questions**
- **Single-Choice Questions**
- **Multiple-Choice Questions**
- **Color-Related Questions**
- **Location-Related Questions**
- **Numerical Count Questions**

Annotations cover a range of GI aspects, including findings, abnormalities, anatomical landmarks, and medical instruments.


When using the Kvasir-VQA dataset, you should include the following information to ensure compliance with the dataset's usage terms, particularly when citing the dataset in documents or papers:

## Terms of Use

The data is released fully open for research and educational purposes under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license](https://creativecommons.org/licenses/by-nc/4.0/). The use of the dataset for purposes such as competitions and commercial purposes needs prior written permission. In all documents and papers that use or refer to the dataset or report experimental results based on the Kvasir-VQA, a reference to the related article needs to be added: 

```
@inproceedings{gautam2024kvasirvqa,
  title={Kvasir-VQA: A Text-Image Pair GI Tract Dataset},
  author={Gautam, Sushant and Storås, Andrea and Midoglu, Cise and Hicks, Steven A. and Thambawita, Vajira and Halvorsen, Pål and Riegler, Michael A.},
  booktitle={Proceedings of the First International Workshop on Vision-Language Models for Biomedical Applications (VLM4Bio '24)},
  year={2024},
  location={Melbourne, VIC, Australia},
  pages={10 pages},
  publisher={ACM},
  doi={10.1145/3689096.3689458}
}
```

## Contact
Please contact michael@simula.no, vajira@simula.no, steven@simula.no or paalh@simula.no for any questions regarding the dataset.


