---
title: 'WICO Graph Dataset'
desc: 'A Labeled Dataset of Twitter Subgraphs based on Conspiracy Theory and 5G-Corona Misinformation Tweets.'
thumbnail: thumbnails/wico.png
publication: https://dl.acm.org/doi/10.1145/3472720.3483617
tags:
  - misinformation
  - text
---

In the wake of the COVID-19 pandemic, a surge of misinformation has flooded social media and other internet channels, and some of it has the potential to cause real-world harm. To counteract this misinformation, reliably identifying it is a principal problem to be solved. However, the identification of misinformation poses a formidable challenge for language processing systems since the texts containing misinformation are short, work with insinuation rather than explicitly stating a false claim, or resemble other postings that deal with the same topic ironically. Accordingly, for the development of better detection systems, it is not only essential to use hand-labeled ground truth data and extend the analysis with methods beyond Natural Language Processing to consider the characteristics of the participant's relationships and the diffusion of misinformation. This paper presents a novel dataset that deals with a specific piece of misinformation: the idea that the 5G wireless network is causally connected to the COVID-19 pandemic. We have extracted the subgraphs of 3,000 manually classified Tweets from Twitter's follower network and distinguished them into three categories. First, subgraphs of Tweets that propagate the specific 5G misinformation, those that spread other conspiracy theories, and Tweets that do neither. We created the WICO (Wireless Networks and Coronavirus Conspiracy) dataset to support experts in machine learning experts, graph processing, and related fields in studying the spread of misinformation. Furthermore, we provide a series of baseline experiments using both Graph Neural Networks and other established classifiers that use simple graph metrics as features.

## Dataset Details
The dataset has been collected from Twitter during a period between 1st of January 2020 and 15th of July 2020, by searching for the 5G and Corona-virus-related keywords (e.g., "5G", "corona", "COVID-19", etc.) inside the tweets' text. All tweets should still be online at the time of releasing the dataset. The dataset consists out of three classes.

**5G-Corona Conspiracy:** This class contains all tweets that claim or insinuate some deeper connection between COVID-19 and 5G, such as the idea that 5G weakens the immune system and thus caused the current corona-virus pandemic, or that there is no pandemic and the COVID-19 victims were actually harmed by radiation emitted by 5G network towers. The crucial requirement is the claimed existence of some causal link.

**Other Consparacy:** This class contains all tweets that spread conspiracy theories other than the ones discussed above. This includes ideas about an intentional release of the virus, forced or harmful vaccinations, or the virus being a hoax.

**Non-Conspiracy:** This class contains all tweets not belonging to the previous two classes. Note that this also includes tweets that discuss COVID-19 pandemic itself, tweets claim that 5G is not proven to be absolutely safe or even can be harmful without linking it to COVID-19, as well as tweets claiming that authorities are pushing for the installation of 5G while the Publicis distracted by COVID-19. In addition, tweets pointing out the existence of conspiracy theories or mocking them fall into this class since they do not spread the conspiracy theories by inciting people to believe in them.

## Download
| File | Description | Size | Download
| --- | --- | --- | :---: |
| wico.zip  | The entire wico.zip dataset in one zip file. | 115MB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://drive.google.com/file/d/17Qe3StgOwU5M00b83fX1UwX2Ju7Z61rT/view?usp=sharing) 

All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/5m3by](https://osf.io/5m3by)

## Cite
If you use this dataset in your research, Please cite the following paper:

    @inbook{10.1145/3472720.3483617,
        title = {WICO Text: A Labeled Dataset of Conspiracy Theory and 5G-Corona Misinformation Tweets},
        author = {
            Pogorelov, Konstantin and
            Schroeder, Daniel Thilo and
            Filkukov\'{a}, Petra and
            Brenner, Stefan and
            Langguth, Johannes
        },
        year = {2021},
        publisher = {Association for Computing Machinery},
        address = {New York, NY, USA},
        doi = {10.1145/3472720.3483617},
        booktitle = {Proceedings of the 2021 Workshop on Open Challenges in Online Social Networks},
        pages = {21–25},
        numpages = {5}
    }

## Terms of use
The use of the Wico-Graph dataset is restricted to research and education purposes. The use of the dataset is forbidden for commercial use without prior written permission. For other purposes, contact us (see below). In all documents and publications that use the Wico-Graph dataset or report experimental results based on the Wico-Graph dataset, a reference to the dataset paper has to be included (see above). Please email daniels (_at_) simula (_dot_) no if you have any questions regarding how to cite the dataset.

## Contact
Email daniels (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research! 