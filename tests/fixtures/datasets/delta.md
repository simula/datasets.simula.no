---
title: 'Delta Dataset'
desc: 'Soccer dataset that ships raw HTML and a script payload.'
tags:
  - soccer
---

# Delta

Here is a table:

<table>
  <tr><th>Column</th></tr>
  <tr><td>Value</td></tr>
</table>

<script>alert('xss-from-delta')</script>
<a href="javascript:alert(1)">bad link</a>
