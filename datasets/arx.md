---
title: 'Arx'
desc: 'A Text-Classification Dataset Consisting of Norwegian Soccer Articles from VG and TV2.'
thumbnail: thumbnails/arx.jpg
publication: https://ieeexplore.ieee.org/abstract/document/8877417/
tags:
  - soccer
  - text
---

We are today overwhelmed with information, of which an important part is news. Sports news, in particular, has become very popular, where soccer makes up a big part of this coverage. For sports fans, it can be a time consuming and tedious to keep up with the news that they really
care about. In this paper, we present different machine learning methods applied to soccer news from a Norwegian newspaper and a TV station's news site to summarize the content in a short and digestible manner. We present a system to collect, index, label, analyze, and present the collected news articles based on the content. We perform a thorough comparison between deep learning and traditional machine learning algorithms on text classification. Furthermore, we present a dataset of soccer news which was collected from two different Norwegian news sites and shared online.

The world wide web is nearly an endless source of information, of which a lot comes in the form of text. From 2015 to 2018, the total number of websites have doubled, reaching a total number of 1.63 billion different websites in 2018. With this amount of data available, the need to categorize, index and label information is more critical than ever. Along with the increase in data, the popularity of machine learning has also increased. Based on Google search results, the search terms "machine learning" and "deep learning" have grown significantly over the past five years. This rise in popularity is not without reason, as it has shown extraordinary results in numerous different use-cases. A few examples include image classification using convolutional neural networks, language translation using recurrent neural networks, and natural language processing where both RNNs and CNNs have seen much use and showed state-of-the-art performance. We a dataset and an application which were used to conduct the various experiments. The dataset consists of soccer articles extracted from VG.no and TV2.no (two large Norwegian newspapers). Paragraphs from these articles are labeled, stored in a database and used for all experiments. The application was used to make the labeling of the paragraphs easier. Furthermore, it also displays a visual representation of the paragraphs that have been classified by the different algorithms.

## Data Collection
To collect data from our selected news sources, we created a python program which fetches and processes raw HTML code from the web sites of VG and TV2. First, the program uses Request to fetch the HTML code from all the soccer articles on 'www.vg.no/fotball' and 'www.tv2.no/fotball'. Next, the relevant information from the HTML code is extracted using Beautiful Soup (python package for parsing HTML and XML files) and the result is stored in a database. After the data was stored in the database, we used a web app called Arx to label the collected data. The purpose of Arx was to help with the labeling, making the process much quicker. Arx displays the content of each article in a structured way with a labeling option for each paragraph. It is also possible to fetch all paragraphs or articles containing keywords. For example, one can fetch all articles or paragraphs containing the word "målscorer" (goal scorer), "overgang" (attack after a break) or "vinnermålet" (winning goal). This option is beneficial since there are a lot of soccer articles that do not contain relevant paragraphs.

## Dataset Details
The dataset contains 5,526 labeled data samples and is freely available online. The labeling was performed by a person who is familiar with soccer.

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| arx.zip | The Arx dataset in one zipped directory. | 620KB | [<img src="/icons/fa-download-solid.svg" style="margin:0;display: inline;" height="18" width="18"/>](https://datasets.simula.no/downloads/arx.zip) |

## Cite

    @inproceedings{Nordskog2019,
        title = {Semantic Analysis of Soccer News 
          for AutomaticGame Event Classification},
        author = {
            Nordskog, Aanund Jupsk{\aa}s and
            Halvorsen, P{\aa}l and
            Hicks, Steven and
            Stensland, H{\aa}kon K. and
            Hammer, Hugo L. and
            Johansen, Dag and
            Riegler, Michael A.
        },
        series = {CBMI'19},
        year = {2019},
        location = {Dublin, Ireland}
    }

## Terms of use
The use of the Arx dataset is restricted for research and educational purposes only. The use of the Arx dataset for other purposes including commercial purposes is forbidden without prior written permission. In all documents and papers that use or refer to the Arx dataset or report experimental results based on the Arx dataset, a reference to the dataset paper have to be included.

## Contact
Email steven (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research!