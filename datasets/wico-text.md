---
title: 'WICO Text'
desc: 'A labeled dataset of conspiracy theory and 5G-corona misinformation tweets.'
thumbnail: /thumbnails/wico.png
publication: https://dl.acm.org/doi/abs/10.1145/3472720.3483617
tags:
  - 5G
  - COVID
  - Twitter
  - Conspiracy
  - Misinformation
---

The COVID-19 pandemic has been accompanied by a flood of misinformation on social media, which has been labeled an "infodemic".
While a large part of such fake news is ultimately inconsequential, some of it has the potential to real-world harm, but due to the massive amount of social media contents, it is impossible to find this misinformation manually. 
Thus, conventional fact-checking can typically only counteract misinformation narratives after they have gained significant traction. 
Only automated systems can provide warnings in advance. 
However, the automatic detection of misinformation narratives is very challenging since the texts that spread misinformation may be short messages on Twitter. 
They may also transmit misinformation by implication rather than by stating counterfactual information outright, and satirical messages complicate the issue further. 
Thus, there is a need for highly sophisticated detection systems. 
In order to support their development, we created substantial ground truth data by human annotation.
Here, we present a dataset that deals with a specific piece of misinformation: the idea that the COVID-19 pandemic is causally connected to the 5G wireless network. 
We selected more than 10,000 tweets that deal with COVID-19 and 5G and labeled them manually, distinguishing between tweets that propagate the specific 5G misinformation, those that spread other conspiracy theories, and tweets that do neither. 

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| wico-text.zip | The wico-text.zip archive containing the dataset. | ???MB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/wico-text.zip) |

## Cite
  @inproceedings{10.1145/3472720.3483617,
    author = {Pogorelov, Konstantin and Schroeder, Daniel Thilo and Filkukov\'{a}, Petra and Brenner, Stefan and Langguth, Johannes},
    title = {WICO Text: A Labeled Dataset of Conspiracy Theory and 5G-Corona Misinformation Tweets},
    year = {2021},
    isbn = {9781450386326},
    publisher = {Association for Computing Machinery},
    address = {New York, NY, USA},
    url = {https://doi.org/10.1145/3472720.3483617},
    abstract = {The COVID-19 pandemic has been accompanied by a flood of misinformation on social media, which has been labeled an "infodemic". While a large part of such fake news is ultimately inconsequential, some of it has the potential to real-world harm, but due to the massive amount of social media contents, it is impossible to find this misinformation manually. Thus, conventional fact-checking can typically only counteract misinformation narratives after they have gained significant traction. Only automated systems can provide warnings in advance. However, the automatic detection of misinformation narratives is very challenging since the texts that spread misinformation may be short messages on Twitter. They may also transmit misinformation by implication rather than by stating counterfactual information outright, and satirical messages complicate the issue further. Thus, there is a need for highly sophisticated detection systems. In order to support their development, we created substantial ground truth data by human annotation. In this paper, we present a dataset that deals with a specific piece of misinformation: the idea that the COVID-19 pandemic is causally connected to the 5G wireless network. We selected more than 10,000 tweets that deal with COVID-19 and 5G and labeled them manually, distinguishing between tweets that propagate the specific 5G misinformation, those that spread other conspiracy theories, and tweets that do neither. We provide the human-annotated dataset along with an additional large-scale automatically (by using the human-annotated dataset as the training set) labelled dataset consist of more than 100,000 tweets.},
    booktitle = {Proceedings of the 2021 Workshop on Open Challenges in Online Social Networks},
    pages = {21–25},
    numpages = {5}
}

## Terms of use
The use of the WICO-Text dataset is restricted to research and education purposes. The use of the dataset is forbidden for commercial use without prior written permission. For other purposes, contact us (see below). In all documents and publications that use the WICO-Text dataset or report experimental results based on the WICO-Text dataset, a reference to the dataset paper has to be included (see above). Please email konstantin@simula.no if you have any questions regarding how to cite the dataset.

## Contact
Email konstantin (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research!
