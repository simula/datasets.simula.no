---
title: 'Kvasir Capsule'
desc: 'The largest gastrointestinal PillCAM dataset.'
thumbnail: /thumbnails/kvasir-capsule.png
publication: https://www.nature.com/articles/s41597-021-00920-z
github: https://github.com/simula/kvasir-capsule
tags:
  - gastrointestinal
  - images
---

This is the official repository for the Kvasir-Capsule dataset, which is the largest publicly released PillCAM dataset. In total, the dataset contains 47,238 labeled images and 117 videos, where it captures anatomical landmarks and pathological and normal findings. The results is more than 4,741,621 images and video frames all together.

## Dataset Details
The dataset can be split into three distinct parts; Labeled image data, labeled video data, and unlabaled video data. Each part is further described below.

**Labeled images** In total, the dataset contains 47,238 labeled images stored using the PNG format. The images can be found in the images folder. The classes that each of the images belongs correspond to the folder they are stored. For example, the ’polyp’ folder contains all polyp images, and the ’Angiectasia’ folder contains all images of Angiectasia. The number of images per class is not balanced, which is a common challenge in the medical field because some findings occur more often than others. This adds an additional challenge for researchers since methods applied to the data should also be able to learn from a small amount of training data. The labeled images represent 14 different classes of findings. Furthermore, the labeled image data includes bounding box coordinates, which can be found in the *metadata.csv* file.

**Labeled videos** The dataset contains a total of 43 labeled videos containing different findings and landmarks. This corresponds to approximately 19 hours of video and 1,955,675 video frames that can be converted to images if needed. Each video has been manually assessed by a medical professional working in the field of gastroenterology and resulted in a total of 47,238 annotated frames.

**Unlabeled videos** In total, the dataset contains 74 unlabeled videos, which is equal to approximatley 25 hours of video and 2,785,829 video frames.

## Download
| File | Description | Size | Download
| --- | --- | --- | :---: |
| kvasir-capsule-labeled-images.zip  | The entire KvasirCapsule dataset in one zip file. | 3.9GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/kvasir-capsule/kvasir-capsule-labeled-images.zip) |
| kvasir-capsule-labeled-videos.zip  | The labeled vidoes part of the dataset. | 58.2GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/kvasir-capsule/kvasir-capsule-labeled-videos.zip) |
| kvasir-capsule-unlabeled-videos.zip  | The unlabeled vidoes part of the dataset. | 58.2GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/kvasir-capsule/kvasir-capsule-unlabeled-videos.zip) |

All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/dv2ag](https://osf.io/dv2ag)

## Cite
Here is a BibTeX entry that you can use to cite the dataset:

    @article{Smedsrud2021,
      title = {{Kvasir-Capsule, a video capsule endoscopy dataset}},
      author = {
        Smedsrud, Pia H and Thambawita, Vajira and Hicks, Steven A and
        Gjestang, Henrik and Nedrejord, Oda Olsen and N{\ae}ss, Espen and
        Borgli, Hanna and Jha, Debesh and Berstad, Tor Jan Derek and
        Eskeland, Sigrun L and Lux, Mathias and Espeland, H{\aa}vard and
        Petlund, Andreas and Nguyen, Duc Tien Dang and Garcia-Ceja, Enrique and
        Johansen, Dag and Schmidt, Peter T and Toth, Ervin and
        Hammer, Hugo L and de Lange, Thomas and Riegler, Michael A and
        Halvorsen, P{\aa}l
      },
      doi = {10.1038/s41597-021-00920-z},
      journal = {Scientific Data},
      number = {1},
      pages = {142},
      volume = {8},
      year = {2021}
    }

## Terms of Use
The data is released fully open for research and educational purposes. The use of the dataset for purposes such as competitions and commercial purposes needs prior written permission. In all documents and papers that use or refer to the dataset or report experimental results based on the Kvasir-Capsule, a reference to the related article needs to be added: https://www.nature.com/articles/s41597-021-00920-z.

## Contact
Please contact paalh@simula.no, steven@simula.no, or michael@simula.no for any questions regarding the dataset.
