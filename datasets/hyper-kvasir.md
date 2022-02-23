---
title: 'HyperKvasir'
desc: 'The Largest Gastrointestinal Dataset.'
thumbnail: /thumbnails/hyperkvasir.jpg
github: https://github.com/simula/hyper-kvasir
publication: https://www.nature.com/articles/s41597-020-00622-y
tags:
  - gastrointestinal
  - images
---

## Dataset Details
The dataset can be split into four distinct parts; Labeled image data, unlabeled image data, segmented image data, and annotated video data. Each part is further described below.

**Labeled images** In total, the dataset contains 10,662 labeled images stored using the JPEG format. The images can be found in the images folder. The classes, which each of the images belongto, correspond to the folder they are stored in (e.g., the ’polyp’ folder contains all polyp images, the ’barretts’ folder contains all images of Barrett’s esophagus, etc.). The number of images per class are not balanced, which is a general challenge in the medical field due to the fact that some findings occur more often than others. This adds an additional challenge for researchers, since methods applied to the data should also be able to learn from a small amount of training data. The labeled images represent 23 different classes of findings.

**Unlabeled Images** In total, the dataset contains 99,417 unlabeled images. The unlabeled images can be found in the unlabeled folder which is a subfolder in the image folder, together with the other labeled image folders. In addition to the unlabeled image files, we also provide the extracted global features and cluster assignments in the Hyper-Kvasir Github repository as Attribute-Relation File Format (ARFF) files. ARFF files can be opened and processed using, for example, the WEKA machine learning library, or they can easily be converted into comma-separated values (CSV) files.

**Segmented Images** We provide the original image, a segmentation mask and a bounding box for 1,000 images from the polyp class. In the mask, the pixels depicting polyp tissue, the region of interest, are represented by the foreground (white mask), while the background (in black) does not contain polyp pixels. The bounding box is defined as the outermost pixels of the found polyp. For this segmentation set, we have two folders, one for images and one for masks, each containing 1,000 JPEG-compressed images. The bounding boxes for the corresponding images are stored in a JavaScript Object Notation (JSON) file. The image and its corresponding mask have the same filename. The images and files are stored in the segmented images folder. It is important to point out that the segmented images have duplicates in the images folder of polyps since the images were taken from there.

**Annotated Videos** The dataset contains a total of 373 videos containing different findings and landmarks. This corresponds to approximately 11.62 hours of videos and 1,059,519 video frames that can be converted to images if needed. Each video has been manually assessed by a medical professional working in the field of gastroenterology and resulted in a total of 171 annotated findings.

## Download
| File | Description | Size | Download
| --- | --- | --- | --- |
| hyper-kvasir.zip  | The entire HyperKvasir dataset in one zip file. | 58.6GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/hyper-kvasir/downloads/hyper-kvasir.zip) |
| hyper-kvasir-labeled-images.zip  | The entire HyperKvasir dataset in one zip file. | 3.9GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/hyper-kvasir/downloads/hyper-kvasir-labeled-images.zip) |
| hyper-kvasir-labeled-videos.zip  | The entire HyperKvasir dataset in one zip file. | 25.2GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/hyper-kvasir/downloads/hyper-kvasir-videos.zip) |
| hyper-kvasir-segmentation.zip  | The entire HyperKvasir dataset in one zip file. | 46MB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/hyper-kvasir/downloads/hyper-kvasir-segmented-images.zip) |
| hyper-kvasir-unlabeled-images.zip  | The entire HyperKvasir dataset in one zip file. | 29.4GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/hyper-kvasir/downloads/hyper-kvasir-unlabeled-images.zip) |

All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/mh9sj](https://osf.io/mh9sj/)

## Cite
If you use this dataset in your research, Please cite the following paper: 

    @article{Borgli2020,
      title = {{HyperKvasir, a comprehensive multi-class
        image and video dataset for gastrointestinal endoscopy}},
      author = {
        Borgli, Hanna and Thambawita, Vajira and
        Smedsrud, Pia H and Hicks, Steven and Jha, Debesh and
        Eskeland, Sigrun L and Randel, Kristin Ranheim and
        Pogorelov, Konstantin and Lux, Mathias and
        Nguyen, Duc Tien Dang and Johansen, Dag and
        Griwodz, Carsten and Stensland, H{\aa}kon K and
        Garcia-Ceja, Enrique and Schmidt, Peter T and
        Hammer, Hugo L and Riegler, Michael A and
        Halvorsen, P{\aa}l and de Lange, Thomas
      },
      doi = {10.1038/s41597-020-00622-y},
      issn = {2052-4463},
      journal = {Scientific Data},
      number = {1},
      pages = {283},
      url = {https://doi.org/10.1038/s41597-020-00622-y},
      volume = {7},
      year = {2020}
    }

## Terms of Use
The data is released fully open for research and educational purposes. The use of the dataset for purposes such as competitions and commercial purposes needs prior written permission. In all documents and papers that use or refer to the dataset or report experimental results based on the Hyper-Kvasir, a reference to the related article needs to be added: https://www.nature.com/articles/s41597-020-00622-y.

## Contact
Please contact steven@simula.no, michael@simula.no, or paalh@simula.no for any questions regarding the dataset.
