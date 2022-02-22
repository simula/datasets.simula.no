---
title: 'HYPERAKTIV'
desc: 'A Motor Activity Database of Patients with ADHD.'
thumbnail: thumbnails/hyperaktiv.png
github: https://github.com/simula/hyperaktiv
publication: https://dl.acm.org/doi/10.1145/3458305.3478454
tags:
  - mental health
  - images
---
HYPERAKTIV is a public dataset containing health, activity, andheart rate data from adult patients diagnosed with attention deficit hyperactivity disorder, better known as ADHD. The dataset consists of data collected from 51 patients with ADHD and 52 clinicalcontrols. In addition to the activity and heart rate data, we also include a series of patient attributes such as their age, sex, and information about their mental state, as well as output data from a computerized neuropsychological test.

This repository is structured as follows. The experiments directory contains the code used to perform the baseline experiments presented in the paper. The notebooks directory is supplementary and repeats the baseline experiments using Python notebooks. The scripts directory contains the code used to extract features from the activity data used in the baseline experiments.

## Download
| File | Description | Size | Download |
| --- | --- | --- | :---: |
| hyperaktiv.zip | The hyperaktiv.zip archive containing the dataset. | 51.6MB | [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/hyperaktiv.zip) |

All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/3agwr](https://osf.io/3agwr)

 ## Cite
If you use this dataset in your research, Please cite the following paper:

        @inproceedings{Hicks2021,
            title = {{HYPERAKTIV: An Activity Dataset from
                Adult Patients with Attention-Deficit/Hyperactivity Disorder (ADHD)}},
            author = {
                Steven Hicks and
                Andrea Stautland and
                Ole Bernt Fasmer and
                Wenche Førland and
                Hugo Lewi Hammer and
                Pål Halvorsen and
                Kristin Mjeldheim and
                Ketil Joachim Oedegaard and
                Berge Osnes and
                Vigdis Elin Giæver Syrstad and
                Michael Riegler and
                Petter Jakobsen
            },
            booktitle = {Proceedings of the 12th ACM Multimedia Systems Conference},
            doi = {10.1145/3458305.3478454},
            year = {2021}
        }

## Terms of Use
The data is released fully open for research and educational purposes. The use of the dataset for purposes such as competitions and commercial purposes needs prior written permission.

## Ethics approval
In this study, we used fully anonymized data approved by Privacy Data Protection Authority. Furthermore, we confirm that all experiments were performed in accordance with the relevant guidelines and regulations of the Regional Committee for Medical and Health Research Ethics - South East Norway, and the GDPR.

## Contact
Please contact steven@simula.no, michael@simula.no, or paalh@simula.no for any questions regarding the dataset.
