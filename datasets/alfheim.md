---
title: 'Alfheim'
desc: 'Soccer video and player position dataset.'
thumbnail: thumbnails/alfheim.png
publication: https://dl.acm.org/doi/10.1145/2557642.2563677
tags:
  - soccer
  - video analysis
---

In this dataset paper, we present and make available a dataset of elite soccer player movements and corresponding videos. The dataset is captured at Alfheim Stadium -- the home arena for Tromsø IL (Norway). The player postions are measured at 20~Hz using the ZXY Sport Tracking system, and the video is captured from the middle of the field using two camera arrays. The player tracking system provides the player coordinates on the field, their speed, acceleration and force together with an ID and timestamp. The camera array covers the entire field, and each camera can be used individually or as a stitched panorama video. In addition to the obvious sport analytics scenario, the dataset can be used several ways. In the multimedia scenario, the combination of sensor data and video gives a researcher a video dataset with a ground truth object position from the sensor data, i.e., it can be used to test algorithms used for feature extraction, object tracking, background substraction, etc. The sensor data itself can also be used alone in simulations or experiments where for example the users with devices move on a limited area (the field) with a varying speed and direction.

## Randomized sensor tags
The players' identity in the body-sensor data is randomized to protect the privacy of the players. Although the dataset can be used for general object and people tracking, attempts to re-identify individual players, create player/club performance profiles, and similar, are not allowed. The data may only be used for non-commercial research purposes.

## Available sets
The different datasets are grouped in game periods, i.e., every 45 minutes period is an own set. The log format for the sensor data is described in the paper. The video files are coded as 3-second segments where the file name is on the format xxxx_YYYY-MM-DD hh:mm:ss.000000000.h264. Here, xxxx is a monotonically increasing segment number, YYYY-MM-DD is the date and hh:mm:ss.00000000 is the time. The format of these logs are described in the dataset paper.
The entire dataset is slightly above 100 GB.

### Camera setting 1: 2 complete games

| Single camera 0 | Single camera 1 | Single camera 2 | Panorama video |
| :-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|
| ![](https://datasets.simula.no/downloads/alfheim/2013-11-03/thumb/thumb_0.png)  |  ![](https://datasets.simula.no/downloads/alfheim/2013-11-03/thumb/thumb_1.png) | ![](https://datasets.simula.no/downloads/alfheim/2013-11-03/thumb/thumb_2.png)  |  ![](https://datasets.simula.no/downloads/alfheim/2013-11-03/thumb/thumb_pan.png) |

| 2013-11-03: Tromsø IL - Strømsgodset | First half | Second half |
| --- | --- | --- |
| ZXY data raw (20Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-03/zxy/2013-11-03_tromso_stromsgodset_raw_first.csv) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-03/zxy/2013-11-03_tromso_stromsgodset_raw_second.csv) |
| ZXY data interpolated (20Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-03/zxy/2013-11-03_tromso_stromsgodset_first.csv) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-03/zxy/2013-11-03_tromso_stromsgodset_second.csv) |
| ZXY data (1Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-03/zxy/2013-11-03_tromso_stromsgodset_agg_first.csv) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-03/zxy/2013-11-03_tromso_stromsgodset_agg_second.csv) |
| Single camera 0 | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/First%20Half/0/) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/Second%20Half/0/) |
| Single camera 1 | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/First%20Half/1/) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/Second%20Half/0/) |
| Single camera 2 | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/First%20Half/2/) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/Second%20Half/0/) |
| Stiched panorama video | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/First%20Half/panorama) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-03/Second%20Half/0/) |

| 2013-11-07: Tromsø IL - Anzhi | First half | Second half |
| --- | --- | --- |
| ZXY data raw (20Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-07/zxy/2013-11-07_tromso_anji_raw_first.csv) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-07/zxy/2013-11-07_tromso_anji_raw_second.csv) |
| ZXY data interpolated (20Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-07/zxy/2013-11-07_tromso_anji_first.csv) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-07/zxy/2013-11-07_tromso_anji_second.csv) |
| ZXY data (1Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-07/zxy/2013-11-07_tromso_anji_agg_first.csv) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-07/zxy/2013-11-07_tromso_anji_agg_second.csv) |
| Single camera 0 | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/First%20Half/0/) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/Second%20Half/0/) |
| Single camera 1 | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/First%20Half/1/) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/Second%20Half/0/) |
| Single camera 2 | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/First%20Half/2/) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/Second%20Half/0/) |
| Stiched panorama video | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/First%20Half/panorama) | [video](https://datasets.simula.no/downloads/alfheim/2013-11-07/Second%20Half/0/) |

### Camera setting 2: 1 game (about 40 minutes)

The camera setup for this dataset is different from the two games above. Here, the five 2K-camera array is moved to the position of the three single cameras used above.

This dataset also has a small dataset (manually extracted) of the ball position. The file-names of the repsective video and ball position files have corresponding names, i.e., the video file 0000_2013-11-28 19:03:54.469509000.h264 has 75 video frames, and the corresponding tracing file is named 0000_2013-11-28 19:03:54.469509000.h264_track.txt. The format of the lines in these tracking logs is 1 1890 660, where each of the 75 lines in the file corresponds to one video frame, i.e., the above line means that in frame number 1 in the video file, the ball is found at pixel position (1890, 660).

| Single camera 0 |
| :-------------------------:|
| ![](https://datasets.simula.no/downloads/alfheim/2013-11-28/thumb/2013-11-28_thumb.png) |

| 2013-11-28: Tromsø IL - Tottenham Hotspurs | Downloads |
| --- | --- |
| ZXY data raw (20Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-28/zxy/2013-11-28_tromso_tottenham_raw.csv) |
| ZXY data interpolated (20Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-28/zxy/2013-11-28_tromso_tottenham.csv) |
| ZXY data (1Hz) | [sensor data](https://datasets.simula.no/downloads/alfheim/2013-11-28/zxy/2013-11-28_tromso_tottenham_agg.csv) |
| Ball position | [ball position](https://datasets.simula.no/downloads/alfheim/2013-11-28/ball/) |
| Stiched panorama video | [video](https://datasets.simula.no/downloads/alfheim/2013-11-28/panorama) -- [\[archive .tgz\]](https://datasets.simula.no/downloads/alfheim/2013-11-28/pano.tgz) |

## Example how to generate longer videos
As said above, the videos are generated into 3-second individual video clips in pure H.264. To make longer videos into one file, it should be possible to concatenate the files directly using for example cat. However, if your player also needs a container, the easiest is perhaps to use ffmpeg and its concatenation option (-f concat). So, if you for example want to generate an MPEG4 file, in 1080p with a rate of 1 Mbps from minute 9 to minute 10 in the Tottenham game, you first generate a file (e.g., "files.txt") of the segments you want to include:

    file '0180_2013-11-28 19:12:54.470740000.h264'
    file '0181_2013-11-28 19:12:57.470788000.h264'

    ... [snip segments 0182 - 0197] ...

    file '0198_2013-11-28 19:13:48.431859000.h264'
    file '0199_2013-11-28 19:13:51.431950000.h264'

Then, you for example run the below line to generate a new video to be written into the output.mp4 file:

    ffmpeg -f concat -i files.txt -vf scale=1080:-1 -vcodec mpeg4 -b:v 1000k output.mp4

## Mapping/transformation matrices:
The paper mentions that transformation matrices are available at this site. Most of these have unfortunately been lost in moving operations and web-site rebuilds. However, searching through old data, we can provide the transformation matrices for the individual cameras. As you can observe, the panorama creation is a non-linear process and it is not possible to enclose the transformation from the planar field to the cylindrical panorama using a simple 3x3 matrix. The second panorama provides the ball position directly in terms of panorama coordinates.
An example homography matrix for single camera 0 for example is:

    [ 4.914354079621551, 24.44455753151205, 50.4041090334094;
    -0.8751965043278721, 0.3846773390765911, 297.2819122276194;
    -0.01456027270611442, 0.01591279644474043, 1 ]
 
We suggest thet you do not use these matrices straight away for any purpose apart from experimentation. The reason being that the cameras use a 4mm lens which means that we had to rectify the barrel distortion. Even though ideally there is a simple transformation from field space to camera space. We found (and as mentioned in paper) these transformations not so reliable. You can easily build one of these using simple homography estimation from frames to the field.

## Earlier use of the dataset
These data are already used in several publications, including:

* "Bagadus: An Integrated Real-Time System for Soccer Analytics"
Håkon Kvale Stensland, Vamsidhar Reddy Gaddam, Marius Tennøe, Espen Helgedagsrud, Mikkel Næss, Henrik Kjus Alstad, Asgeir Mortensen, Ragnar Langseth, Sigurd Ljødal, Øystein Landsverk, Carsten Griwodz, Pål Halvorsen, Magnus Stenhaug, Dag Johansen,
Transactions on Multimedia Computing, Communications and Applications (TOMCCAP), Vol. 10, Issue 1s, January 2014, Article No. 14
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/tomccap2014-bagadus.pdf)
* "Efficient Implementation and Processing of a Real-time Panorama Video Pipeline"
Marius Tennøe, Espen Helgedagsrud, Mikkel Næss, Henrik Kjus Alstad, Håkon Kvale Stensland, Vamsidhar Reddy Gaddam, Dag Johansen, Carsten Griwodz, Pål Halvorsen
Proceedings of the International Symposium on Multimedia (ISM), Anaheim, CA, USA, December 2013
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/ism2013-bagadus.pdf)
* "Combining Video and Player Telemetry for Evidence-Based Decisions in Soccer"
Håvard D. Johansen, Svein Arne Pettersen, Pål Halvorsen, Dag Johansen
Proceedings of the International Congress on Sports Science Research and Technology Support (icSPORTS), Algarve, Portugal, September 2013
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/icSport2013.pdf)
* "Real-time Panorama Video Processing Using NVIDIA GPUs" (poster)
Marius Tennøe, Espen Helgedagsrud, Mikkel Næss, Henrik Kjus Alstad, Håkon Kvale Stensland, Carsten Griwodz, Pål Halvorsen
Web-site of the GPU Technology Conference, San Jose, CA, USA, March 2013
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/GPU-conference2013.pdf) [\[web-site\]](http://www.gputechconf.com/page/posters.html#vidimg)
* "Bagadus: An Integrated System for Arena Sports Analytics - A Soccer Case Study"
Pål Halvorsen, Simen Sægrov, Asgeir Mortensen, David K. C. Kristensen, Alexander Eichhorn, Magnus Stenhaug, Stian Dahl, Håkon Kvale Stensland, Vamsidhar Reddy Gaddam, Carsten Griwodz, Dag Johansen
Proceedings of the International Conference on Multimedia Systems (MMSys), Oslo, Norway, February/March 2013, pp. 48-59
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/mmsys2013-bagadus.pdf) [\[YouTube\]](http://www.youtube.com/watch?v=1zsgvjQkL1E)
* "BAGADUS: An Integrated System for Soccer Analysis (Demo)"
Simen Sægrov, Alexander Eichhorn, Jørgen Emerslund, Håkon Kvale Stensland, Carsten Griwodz, Dag Johansen, Pål Halvorsen
Proceedings of the International Conference on Distributed Smart Cameras (ICDSC), Hong Kong, October/November 2012
[\[pdf\]](http://home.ifi.uio.no/paalh/publications/files/icdsc2012.pdf)

## Contact
Email paalh (_at_) simula (_dot_) no if you have any questions about the dataset and our research activities. We always welcome collaboration and joint research!