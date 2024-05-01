<h1 align="center">
  <p>GagarinHack</p>
</h1>

<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Alisa-Mikulina/GagarinHack/main/Readme%20Files/first_page.jpg" alt="Image 1" width="100%"></td>
    <td><img src="https://raw.githubusercontent.com/Alisa-Mikulina/GagarinHack/main/Readme%20Files/recognised.jpg" alt="Image 2" width="100%"></td>
  </tr>
</table>

<br><br>

<h2 align="center">✨&nbsp;&nbsp;Project main idea</h2>

<br>

<h3>The goal of this project is to build a web app that can identify different types of document pages photos. It is also able to find and pull out important information from those documents.</h3>

<p></p>

<h4>
  <ul>• Rotation angle detection: using EfficientNetB3, abandoned pytesseract</ul>
  <ul>• Document + page type classification: using the same EfficientNetB3, but additionally trained for the corresponding task. Each document type has its own EfficientNetB3</ul>
  <ul>• Text segmentation: Yolov8 shows the boundaries of the areas where the text is located</ul>
  <ul>• Text recognition: for this we use easyocr</ul>
</h4>

<br><br>

<h2 align="center">✨&nbsp;&nbsp;Model Metrics</h2>

<p></p>

<h4>
  <ul><h2>0.8477</h2> ▲ f-1 score for document classification</ul>
  <ul><h2>0.98</h2> ▲ f-1 score for determining document page</ul>
</h4>

<br><br>

<h2 align="center">✨&nbsp;&nbsp;Video Preview</h2>
<img src="https://raw.githubusercontent.com/Alisa-Mikulina/GagarinHack/main/Readme%20Files/video.gif" alt="My Awesome GIF" width="300">

<br><br>

<h2 align="center">✨&nbsp;&nbsp;Run the project for yourself</h2>

<p></p>

<h4>
  <ul>• Clone the project to your PC</ul>
  <ul>• Run <code>API/main.py</code> to start the server</ul>
  <ul>• Go to <code>Front/gagarin-app</code> and run <code>npm run</code> command in yout terminal to run the front</ul>
  <ul>• Go to <code><a href="http://localhost:8000">http://localhost:8000</a></code> to visit the website</ul>
</h4>
