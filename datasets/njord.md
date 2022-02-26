---
title: 'Njord'
desc: 'A fishing boat dataset.'
thumbnail: /thumbnails/njord.jpeg
github: https://github.com/simula/njord
hidden: true
tags:
  - fishing
  - segmentation
---

A modern fishing vessel is infused with high-tech digital technologies.  The bridge deck of a trawler operating in, for instance, the Arctic contains numerous terminals visualizing geographical position and other vessels in the vicinity, weather conditions and predictions, fish finder sonar data and the like. Video streams from the deck and production line under deck are also frequently displayed so that the officer in-charge has real-time information when making operational decisions. The video stream is used, for instance, in a safety context for the crew members alone on deck or working somewhere along the heavy machinery constituting a production line. Accidents in this industry is not an exception. The constant collection of voluminous, multimodal data on a modern commercial fishing vessels leads to interesting possibilities for the application of advanced analysis methods. For example, using Artificial Intelligence (AI) to analyse this data could lead to new insights supporting more energy-efficient location of fish to catch, a sustainable catching, and a safer working environment for the fishermen. Add to this the potential such technologies applied can have in a resource control and global management perspective. 

## Dataset Details
As previously described, the dataset Njord contains surveillance videos from the *Hermes* fishing trawler that were live-streamed online in 2019 as *Slow TV* entertainment. The videos are from a trip from the western shores of Greenland to Norway, documenting their fishing journey. There were a total of 29 videos that are, on average, 1 hour in duration. These were downloaded from YouTube using the *youtube-dl* CLI tool. They were then split up into 10 minute segments to be easier to deal with both in the labeling and the benchmarking process. At the time of submission we have annotated a subset of these. This results in a dataset with 71 videos that have been annotated so far, and 127 videos which are not annotated. With 71 annotated videos, each with a frame rate of 25 fps and a duration of approximately 10-minutes, results in approximately 1,065,000 frames with annotations. The videos have a resolution 1,280x720 and run at 25 frames per second. The videos have varying lighting conditions with complex, moving backgrounds, due to the trawler being at sea. The videos consist of eight different fixed-camera scenes plus a view with a manually-operated camera for showing particularly interesting events, such as whale observations and other boats. The cameras are changed between on a fixed schedule, but can also be manually changed by the captain. This sometimes result in scenes having varying durations. There are overlays that sometimes appear on screen. These show general information about what is being caught, about the vessel in general, and statistics related to catch. They also sometimes show a map overlay with the current location of the trawler along with speed and orientation of it.

For each video we have labelled bounding boxes around people, other boats, nets, and fish. The temporal annotations consist of when scene changes occur, when overlays are turned on and off, when Events of Interest (EoI) occur, and when the intro plays. We also have labels that denote whether it is daytime or nighttime, and, due to the videos being from a live-stream, labels for parts of the videos that are before the introduction and after the end of the relevant live-stream. The bounding boxes for fish label groups of fish, due to the scenes on deck showing fish being far away from the camera. The bounding boxes for the nets both label nets in use and those lying in heaps on deck.

The labels were manually created using Labelbox. Labelbox is a platform for annotating datasets. It had a simple interface that allowed us to label bounding boxes and temporal annotations. For the bounding boxes it linearly interpolates between keyframes, allowing for faster annotating. The dataset is anticipated as continuously growing and expanding (in terms of annotations, but also amount of data), and currently it contains 71 fully annotated videos and 127 videos without annotations. The not annotated video can also be useful for unsupervised or self supervised learning experiments.

## Dataset Structure
The dataset is organized as follows. The root directory contains a *readme.txt* file and a *videos* directory. The *readme.txt* file gives a brief description of the included data and annotations. The *videos* directory contains a subdirectory for each annotated video that contains the video in *.mp4* format and two annotation files, one file for the bounding box annotations and one file for the timeline annotations. The two annotation files are structured as *.csv* files using a semi-colon as the delimiter. The bounding box contains one line per bounding box annotation with the following 7 values; class, frame number, center x position, center y position, the bounding box's width, and the bounding box's height. The width and height have been normalized by dividing each by the video's width and height, respectively. The timeline annotation file contains one line per annotated class and includes the following two values; the class of the frame and the frame number of the corresponding video. The *videos* directory also contains a *unannotated* subdirectory containing all videos that have not been annotated yet.

## Download
| File | Description | Size | Download
| --- | --- | --- | :---: |
| njord.zip  | The dataset in a single zip file. | 16.3GB |  [<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-0 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>](/downloads/njord.zip) |

## Terms of use
The data is released fully open for research and educational purposes. The use of the dataset for purposes such as competitions and commercial purposes needs prior written permission.

## Contact
Please contact steven@simula.no or michael@simula.no for any questions regarding the dataset.
