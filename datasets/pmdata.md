---
title: 'PMData '
desc: 'A lifelogging dataset of 16 persons during 5 months using Fitbit, Google Forms and PMSys.'
thumbnail: /thumbnails/pmdata.jpg
publication: https://dl.acm.org/doi/10.1145/3339825.3394926
tags:
  - sports
  - sensor
---

The PMData dataset that aims to combine the traditional lifelogging with sports activity logging. Such a dataset enables the development of several interesting analysis applications, e.g., where additional sports data can be used to predict and analyze everyday developments like a person's weight and sleep patterns, and where traditional lifelog data can be used in a sports context to predict an athletes performance. In this respect, we have used the Fitbit Versa 2 smartwatch wristband, the PMSys sports logging app, and Google forms for the data collection. PMData contains logging data of 16 persons from a period of 5 months.

## Fitbit
The data from the Fitbit Versa 2 smartwatch has been extracted into csv- and json files, and the fitbit directory contains the following files:
* **calories.json** shows how many calories the per-son have burned the last minute.
* **distance.json** gives the distance moved per minute. Distance is given in centimeters.
* **exercise.json** describes each activity in more detail. It contains the date with start and stop time, time in different activity levels, type of activity and various performance metrics depending on the type of exercise, such as, for running, it contains distance, time, steps, calories, speed, and pace.
* **heart_rate.json** shows the number of heartbeatsper minute (bpm) at a given time.
* **sedentary_minutes.json** sums up the number of sedentary minutes per day.
* **lightly_active_minutes.json** sums up the number of lightly active minutes per day.
* **moderately_active_minutes.json** sums up the number of moderately active minutes per day.
* **very_active_minutes.json** sums up the number of very active minutes per day.
* **resting_heart_rate.json** gives the resting heart rate per day.
* sleep_score.csv helps understand the sleep each night so you can see trends in the sleep patterns. It contains an overall 0-100 score made up of composition, revitalization and duration scores, the number of deep sleep minutes, the resting heart rate and a restlessness score.
* **sleep.json** is a per sleep breakdown of the sleep into periods of light, deep, REM sleeps and time awake.
* **steps.json** displays the number of steps per minute.
* **time_in_heart_rate_zones.json** gives the number of minutes in different heart rate zones. Using the common formula of 220 minus your age to find the max heartrate, Fitbit will calculate your maximum heart rate and then create three target heart rate zones—fat burn (50 to 69 percent of your max heart rate), cardio (70 to 84 percent of your max heart rate), and peak (85 to 100 percent of your max heart rate).

As can be observed, there are various parameters included. There are 2,440 activity sessions (manual and 15-min-auto reports), 20,991,392 heart rate measurements, and 1,836 days of sleep scores included.

## PMSys
In terms of subjective reporting, there are three CSV-files with corresponding info-files to explain the various fields:
**srpe.csv** contains a training session’s end-time, type of activity, the perceived exertion, and the duration in the number of minutes. This is, for example, used to calculate the session’s training load or sRPE (RPE×duration).
**wellness.csv** includes parameters like time and date, fatigue, mood, readiness, sleep duration (number of hours), sleep quality, soreness (and soreness area), and stress. Fatigue, sleep quality, soreness, stress, and mood all have a 1-5 scale. Score 3 is normal, and 1-2 are scores below normal, and 4-5 are scores above normal. Sleep length is just a measure of how long the sleep was in hours, and readiness (scale 0-10) is an overall subjective measure of how ready you are to exercise, i.e., 0 means not ready at all, and 10 indicates that you cannot feel any better and are ready for anything!
**injury.csv** shows injuries with a time and date and corresponding injury locations and a minor and major severity.

In total, there are 783 training sessions, 1,747 wellness reports, and 225 injury reports submitted.

## Google Forms
The googledocs directory contains the reporting.csv data file, which contains daily reporting data. The data file contains one line per report, including the date reported for, timestamp of the report submission time, the eaten meals (breakfast, lunch, dinner, and evening meal), the participants weigh this day, the number of glasses drunk, and whether one has consumed alcohol.

In total, there are 1,569 reports. Similarly to the PMSys data, these reports are also subjective, and some data points are missing. Nevertheless, the submitted data gives some indications of consumed food and drinks and might give important insights into calorie intake. Together with reported activity, this can indicate weight loss or gain.

## Food Images
Participants 1, 3, and 5 took pictures of everything they consumed, except water, for two months (February and March 2020). There are 644 images included, divided between the participants. Information about the day and time of capture can be found in the Exif image headers. The participants used their mobile phone cameras to collect the images (iPhone 6s, iPhone X, and iPhone XS). MacOS Photos was used to export the photos in full quality.

## Download
| File | Description | Size | Download
| --- | --- | --- | :---: |
| pmdata.zip  | The entire pmdata.zip dataset in one zip file. | 1.4GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](https://datasets.simula.no/downloads/pmdata.zip) |

All files can be viewed and downloaded in our OSF repository available here: [https://osf.io/vx4bk](https://osf.io/vx4bk)

## Cite
    @inproceedings{10.1145/3339825.3394926,
            title = {PMData: A Sports Logging Dataset},
            author = {
              Thambawita, Vajira and Hicks, Steven Alexander and Borgli, Hanna and
              Stensland, H\r{a}kon Kvale and Jha, Debesh and Svensen, Martin Kristoffer and
              Pettersen, Svein-Arne and Johansen, Dag and Johansen, H\r{a}vard Dagenborg and
              Pettersen, Susann Dahl and Nordvang, Simon and Pedersen, Sigurd and
              Gjerdrum, Anders and Gr\o{}nli, Tor-Morten and Fredriksen, Per Morten and
              Eg, Ragnhild and Hansen, Kjeld and Fagernes, Siri and
              Claudi, Christine and Bi\o{}rn-Hansen, Andreas and Nguyen, Duc Tien Dang and
              Kupka, Tomas and Hammer, Hugo Lewi and Jain, Ramesh and Riegler, Michael Alexander and
              Halvorsen, P\r{a}l
            },
            year = {2020},
            publisher = {Association for Computing Machinery},
            address = {New York, NY, USA},
            doi = {10.1145/3339825.3394926},
            booktitle = {Proceedings of the 11th ACM Multimedia Systems Conference},
            pages = {231–236},
            numpages = {6},
            location = {Istanbul, Turkey},
            series = {MMSys '20}
    }

## Terms of use
PMData is licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) License, which permits use, sharing, adaptation, distribution and reproduction in any medium or format, as long as you give appropriate credit to the original author(s) and the source.  This means that in all documents and papers that use or refer to the PMData dataset or report experimental results based on the dataset, a reference to the related article needs to be added: https://dl.acm.org/doi/10.1145/3339825.3394926. Additionally, one should provide a link to the Creative Commons license, and indicate if changes were made. The images or other third party material in this article are included in the article’s Creative Commons license, unless indicated otherwise in a credit line to the material. If material is not included in the article’s Creative Commons license and your intended use is not permitted by statutory regulation or exceeds the permitted use, you will need to obtain permission directly from the copyright holder. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

## Ethics approval
Before collection, each participant has signed a form allowing us to collect and publish the data related to this project.

## Contact
Email michael (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research! 