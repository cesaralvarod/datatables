class Datatable {
  // ID table

  element;

  // Style table

  style;

  // Array Pagination
  pagination;

  // Ajax

  ajaxInfo;

  // Table estructure

  headers;
  items;
  headerButtons;

  // Others

  copyItems;
  numberOfEntries;
  totalOptionsEntries;
  columns;

  // Constructor
  constructor({
    element,
    headerButtons = [],
    style = {
      theme: "light",
      highlight: false,
      shadow: false,
      checkbox: false,
    },
    ajax = {
      url: null,
      dataSrc: null,
      request: "POST",
      async: false,
      requestHeader: "application/x-www-form-urlencoded",
      send: "",
    },
    headers = [],
    items = [],
    entries = [5, 10, 20],
    columns = [],
  }) {
    this.element = document.querySelector(element);
    this.style = {
      theme: style.theme ? style.theme : "light",
      highlight: style.highlight ? style.highlight : false,
      shadow: style.shadow ? style.shadow : false,
      checkbox: style.checkbox ? style.checkbox : false,
    };
    this.pagination = {
      total: 0,
      noItemsPerPage: 0,
      noPages: 0,
      actual: 0,
      pointer: 0,
      diff: 0,
      lastPageBeforeDots: 0,
      noButtonsBeforeDots: 4,
    };
    this.ajaxInfo = {
      url: ajax.url ? ajax.url : null,
      dataSrc: ajax.dataSrc ? ajax.dataSrc : null,
      request: ajax.request ? ajax.request : "POST",
      async: ajax.async ? ajax.async : false,
      requestHeader: ajax.requestHeader
        ? ajax.requestHeader
        : "application/x-www-form-urlencoded",
      send: ajax.send ? ajax.send : "",
    };
    this.headers = headers;
    this.items = items;
    this.copyItems = [];
    this.numberOfEntries = entries[0];
    this.totalOptionsEntries = entries;
    this.columns = columns;
    this.headerButtons = headerButtons;
  }

  // make table

  makeTable() {
    this.element.classList.add("datatable", this.style.theme);
    this.copyItems = [...this.items];
    this.initPagination(this.numberOfEntries, this.copyItems.length);
    this.createHTML();
    this.renderHeaderButtons();
    this.renderHeaders();
    this.renderRows();
    this.renderPagesButtons();
    this.renderSelectEntries();
    this.renderSearch();
  }

  // clear and create html

  createHTML() {
    this.element.innerHTML = "";
    this.element.innerHTML = `
      <div class="header-tools">
        <div class="tools">
          <ul class="header-buttons-container">
          </ul>
        </div>
        <div class="search">
          <input
            type="search"
            class="search-input"
            placeholder="Search"
          />
        </div>
      </div>
      <table class="table ${this.style.highlight ? "highlight-hover" : ""} ${
      this.style.shadow ? "shaded-rows" : ""
    }">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <div class="footer-tools">
        <div class="list-items">
          Show
          <select name="n-entries" id="n-entries" class="n-entries">
          </select>
          entries
        </div>
        <div class="pages">
        </div>
      </div>
    `;
  }

  // renders

  // render header buttons

  renderHeaderButtons() {
    let html = "";
    const buttonsContainer = this.element.querySelector(
      ".header-buttons-container"
    );
    const headerButtons = this.headerButtons;
    headerButtons.forEach((button) => {
      html += `<li><button id="${button.id}"><i class="fa ${button.icon}"></i></button></li>`;
    });
    buttonsContainer.innerHTML = html;
  }

  // render headers

  renderHeaders() {
    this.element.querySelector("thead tr").innerHTML = ``;
    this.headers.forEach((header) => {
      this.element.querySelector("thead tr").innerHTML += `
    <th>${header}</th>
    `;
    });
  }

  // render rows

  renderRows() {
    this.element.querySelector("tbody").innerHTML = ``;
    let data = "";
    const { pointer, total } = this.pagination;
    const limit = this.pagination.actual * this.pagination.noItemsPerPage;

    if (this.copyItems.length === 0) {
      this.element.querySelector(
        "tbody"
      ).innerHTML = `<td style="text-align:center" colspan="${this.headers.length}">No results found</td>`;
    }

    if (this.ajaxInfo.url === null) {
      for (let i = pointer; i < limit; i++) {
        if (i === total) break;

        const { values } = this.copyItems[i];

        data = "";
        values.forEach((cell) => {
          data += `<td>${String(cell)}</td>`;
        });

        this.element.querySelector("tbody").innerHTML += `
        <tr>${data}</tr>
        `;
      }
    }

    if (this.ajaxInfo.url !== null) {
      for (let i = pointer; i < limit; i++) {
        if (i === total) break;
        if (this.columns.length !== 0) {
          let row = this.copyItems[i];
          data = "";
          this.columns.forEach((column) => {
            let item = String(row[column]);
            if (row[column]) {
              data += `<td>${item}</td>`;
            }
          });
          this.element.querySelector("tbody").innerHTML += `<tr>${data}</tr>`;
        }
      }
    }
  }

  // render pages buttons

  renderPagesButtons() {
    const pagesContainer = this.element.querySelector(".pages");
    let pages = "";
    const buttonsToShow = this.pagination.noButtonsBeforeDots;
    const actualIndex = this.pagination.actual;

    let limI = Math.max(actualIndex - 2, 1);
    let limS = Math.min(actualIndex + 2, this.pagination.noPages);

    const missinButtons = buttonsToShow - (limS - limI);

    if (Math.max(limI - missinButtons, 0)) {
      limI = limI - missinButtons;
    } else if (
      Math.min(limS + missinButtons, this.pagination.noPages) !==
      this.pagination.noPages
    ) {
      limS = limS + missinButtons;
    }

    if (limS < this.pagination.noPages - 2) {
      pages += this.getIterateButtons(limI, limS);
      pages += "<li>...</li>";
      pages += this.getIterateButtons(
        this.pagination.noPages - 1,
        this.pagination.noPages
      );
    } else {
      pages += this.getIterateButtons(limI, this.pagination.noPages);
    }

    pagesContainer.innerHTML = `<ul>${pages}</ul>`;

    this.element.querySelectorAll(".pages li button").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.pagination.actual = parseInt(e.target.getAttribute("data-page"));
        this.pagination.pointer =
          this.pagination.actual * this.pagination.noItemsPerPage -
          this.pagination.noItemsPerPage;
        this.renderRows();
        this.renderPagesButtons();
      });
    });
  }

  // render select entries

  renderSelectEntries() {
    this.element.querySelector(".n-entries").innerHTML = ``;
    this.totalOptionsEntries.forEach((number) => {
      this.element.querySelector(".n-entries").innerHTML += `<option ${
        this.numberOfEntries === number ? "selected" : ""
      }>${number}</option>`;
    });
    const select = this.element.querySelectorAll(".n-entries");
    select.forEach((option) => {
      option.addEventListener("change", (e) => {
        let entries = parseInt(e.target.value);
        if (entries !== this.numberOfEntries) {
          this.numberOfEntries = entries;
          this.initPagination(this.numberOfEntries, this.copyItems.length);
          this.renderRows();
          this.renderPagesButtons();
        }
      });
    });
  }

  // function for render select entries

  getIterateButtons(start, end) {
    let res = "";
    for (let i = start; i <= end; i++) {
      if (i === this.pagination.actual) {
        res += `<li><span class="active">${i}</span></li>`;
      } else {
        res += `<li><button data-page=${i}>${i}</button></li>`;
      }
    }
    return res;
  }

  renderSearch() {
    this.element
      .querySelector(".search-input")
      .addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query === "") {
          this.copyItems = [...this.items];
          this.initPagination(this.numberOfEntries, this.copyItems.length);
          this.renderRows();
          this.renderPagesButtons();
          return;
        }
        this.search(query);
        this.initPagination(this.numberOfEntries, this.copyItems.length);
        this.renderRows();
        this.renderPagesButtons();
      });
  }

  search(query) {
    let res = [];
    this.copyItems = [...this.items];
    for (let i = 0; i < this.copyItems.length; i++) {
      if (this.ajaxInfo.url === null) {
        const { values } = this.copyItems[i];
        const row = values;
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          if (cell.toLowerCase().indexOf(query) >= 0) {
            res.push(this.copyItems[i]);
            break;
          }
        }
      }
      if (this.ajaxInfo.url !== null) {
        const item = this.copyItems[i];
        this.columns.forEach((column) => {
          if (item[column]) {
            if (String(item[column]).toLowerCase().indexOf(query) >= 0) {
              res.push(item);
            }
          }
        });
      }
    }
    this.copyItems = [...res];
  }

  // start table

  parse() {
    //ajax not null

    if (this.ajaxInfo.url !== null) {
      if (this.headers.length === 0) {
        const headers = [...this.element.querySelector("thead tr").children];
        headers.forEach((element) => {
          this.headers.push(element.textContent);
        });
      }

      let items = [];
      let xhr = new XMLHttpRequest();
      xhr.open(this.ajaxInfo.request, this.ajaxInfo.url, this.ajaxInfo.async);
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let validate = this.responseText;
          if (validate) {
            items = JSON.parse(validate);
          }
        }
      };
      xhr.setRequestHeader("Content-type", this.ajaxInfo.requestHeader);
      xhr.send(this.ajaxInfo.send);
      this.items = items;
    }

    // ajax null

    if (this.ajaxInfo.url === null) {
      if (this.headers.length === 0) {
        const headers = [...this.element.querySelector("thead tr").children];
        headers.forEach((element) => {
          this.headers.push(element.textContent);
        });
      }

      if (this.items.length === 0) {
        const trs = [...this.element.querySelector("tbody").children];
        trs.forEach((tr) => {
          const cells = [...tr.children];
          const item = {
            values: [],
          };
          cells.forEach((cell) => {
            if (cell.children.length > 0) {
              const status = [...cell.children][0].getAttribute("class");
              if (status !== null) {
                item.values.push(`<span class="${status}"></span>`);
              }
            } else {
              item.values.push(cell.textContent);
            }
          });
          this.items.push(item);
        });
      }
    }

    // make table

    this.makeTable();
  }

  // init pagination

  initPagination(entries, total) {
    this.pagination.total = total;
    this.pagination.noItemsPerPage = entries;
    this.pagination.noPages = Math.ceil(
      this.pagination.total / this.pagination.noItemsPerPage
    );
    this.pagination.actual = 1;
    this.pagination.pointer = 0;
    this.pagination.diff =
      this.pagination.noItemsPerPage -
      (this.pagination.total % this.pagination.noItemsPerPage);
  }
}
