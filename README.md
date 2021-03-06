# datatables
<p>
        Datatables is a complement for your projects, a way to organize your
        data faster ... writing less code! Modify some styles as well as
        different types of tables: static and dynamic (using AJAX) ... Let's see
        the documentation
      </p>
      <h2>Before everything</h2>
      <p>
        To add Datatables in the project you want, you need to enter the
        following line in your html file:
      </p>
      <pre>
&#60;link rel="stylesheet" href="datatables/css/datatables.css" /&#62;</pre
      >
      <p>
        We work with <b>font awesome</b> so you must necessarily include the CDN
        or the files of this famous library, you can
        <a href="https://fontawesome.com" target="_blank">click here</a> to go
        directly to it.
      </p>
      <h2>How to use?</h2>
      <p>
        Let's start creating a simple container in our html code for our table
        will be created:
      </p>
      <pre>&#60;div id="mydatatable"&#62;&#60;/div&#62;</pre>
      <p>
        This tag will create a table for you in a while we will learn to create
        static and dynamic tables.
      </p>
      <p>
        Now in the javascript code we will add the following lines so that the
        table can be created.
      </p>
      <pre>
const myDT = new Datatable({
    element: "#datatable", // "#datatable" is the container id
});</pre
      >
      <p>
        This will create an object of the Datatable class that will allow us to
        work with the <b><em>datatables</em></b> plugin. After this we will use
        the <em>parse()</em> method to create the graphical interface of
        <b><em>datatables</em></b
        >.
      </p>
      <pre>myDT.parse();</pre>
      <h2>Create a static table</h2>
      <p>
        A static table will collect data that you have written in the html code,
        and it is as easy as writing the following lines:
      </p>
      <pre>
&#60;div id="mydatatable"&#62;
  &#60;table&#62;
    &#60;thead&#62;
      &#60;tr&#62;
        &#60;th&#62;Date&#60;/th&#62;
        &#60;th&#62;Name&#60;/th&#62;
        &#60;th&#62;Lastname&#60;/th&#62;
        &#60;th&#62;Age&#60;/th&#62;
        &#60;th&#62;City&#60;/th&#62;
        &#60;th&#62;Email&#60;/th&#62;
      &#60;/tr&#62;
    &#60;/thead&#62;
    &#60;tbody&#62;
      &#60;tr&#62;
        &#60;td&#62;1994-02-15&#60;/td&#62;
        &#60;td&#62;Mary&#60;/td&#62;
        &#60;td&#62;Martsen&#60;/td&#62;
        &#60;td&#62;32&#60;/td&#62;
        &#60;td&#62;Bucharest&#60;/td&#62;
        &#60;td&#62;Mary.Martsen@gmail.com&#60;/td&#62;
      &#60;/tr&#62;
    &#60;/tbody&#62;
  &#60;/table&#62;
&#60;/div&#62;</pre
      >
      <p>
        This html code together with the javascript code described above will
        create the static table.
      </p>
      <h2>Create a dynamic table</h2>
      <p>
        A dynamic table collects data through an AJAX request, it will collect
        it in JSON format and display it. Para crear una tabla dinamica no hay
        necesidad de anadir codigo HTML, solo revisar nuestra respuesta por
        parte de un lenguaje de backend o de un archivo .json.
      </p>
      <p>
        To create a dynamic table we will add the following in our javascript
        code:
      </p>
      <pre>
const myDT = new Datatable({
    element: "#datatable", // "#datatable" is the container id
    ajax:{
      url: 'mydata.json', //where is your data
      // You can also add (no required)
      request: "POST",
      requestHeader: "application/x-www-form-urlencoded",
      send: "",
    }, 
});</pre
      >
      <p>Then as another parameter you must add in the Datatable class:</p>
      <pre>columns: ["date", "name", "lastname", "age", "city", "email"],</pre>
      <p>
        The <em>columns</em> parameter will filter the data of the objects
        brought with ajax from some database or a .json file.
      </p>
      <p>
        And finally as ajax won't bring you the column titles, you have to add
        them manually and this can be done in two ways:
      </p>
      <p>1. In javascript (<em>Datatable</em> class):</p>
      <pre>headers: ["Date", "Name", "Lastname", "Age", "City", "Email"],</pre>
      <p>2. In HTML:</p>
      <pre>
&#60;div id="mydatatable"&#62;
  &#60;table&#62;
    &#60;thead&#62;
      &#60;tr&#62;
        &#60;th&#62;Date&#60;/th&#62;
        &#60;th&#62;Name&#60;/th&#62;
        &#60;th&#62;Lastname&#60;/th&#62;
        &#60;th&#62;Age&#60;/th&#62;
        &#60;th&#62;City&#60;/th&#62;
        &#60;th&#62;Email&#60;/th&#62;
      &#60;/tr&#62;
    &#60;/thead&#62;
  &#60;/table&#62;
&#60;/div&#62;</pre
      >
      <h2>Styles</h2>
      <p>
        You can add some styles to your table writing in
        <em>Datatable</em> class.
      </p>
      <pre>
style:{
    theme: 'dark', // your table will have dark mode
    highlight: true, // when hovering the mouse over a column of the table it will take a different background color
    shadow: true, // the even rows will take on a different color than the odd rows 
}</pre
      >
      <h2>Modify number of entries</h2>
      <p>
        Modify options of the select tag to select the number of entries. You
        need to add the following code snippet to your <em>Datatable</em> class:
      </p>
      <pre>entries: [5, 10, 20, 50],</pre>
      <h2>Versions</h2>
      <p>
        Currently datatables is in demo version, remember that you can
        contribute to the project by
        <a href="https://github.com/cesaralvarod/" target="_blank">github</a>
      </p>
