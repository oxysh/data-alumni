const tmblopsi = document.querySelectorAll('.opsi span');
tmblopsi.forEach(tombol => {
    tombol.addEventListener('click', (e) => {
        tmblopsi.forEach(element => {
            element.classList.remove('active');
        });
        e.target.classList.add('active');

        var target = document.querySelector(e.target.dataset.target);
        var hide = document.querySelector(e.target.dataset.sembunyi);

        hide.classList.add('hide');
        target.classList.remove('hide');
    })
});

tmblopsi[0].click();

const formcontrol = document.querySelectorAll('.form-previewed');

formcontrol.forEach(input => {
    var prev = document.querySelector(input.dataset.preview);
    prev.textContent = input.value;
    input.addEventListener('input', () => {
        prev.textContent = input.value;
        if (input.value == "") {
            prev.textContent = "DEFAULT VALUE";
        }
    })
});

const tambahtitle = document.querySelector('#tambah-pertanyaan-title');
const tambahselect = document.querySelector('#tambah-pertanyaan-jenis');
const tambahformpreview = document.querySelector('.form-group#tambah-pertanyaan-preview');
const tambahinputpreview = tambahformpreview.querySelectorAll('.form-control');
const tambahopsigroup = document.querySelector('#tambah-pertanyaan-opsi-group');
const tambahopsifield = document.querySelector('#tambah-pertanyaan-opsi');

tambahtitle.addEventListener('input', () => {
    if (tambahtitle.value != "") {
        document.querySelector('#tambah-pertanyaan-preview-title').textContent = tambahtitle.value;
    } else {
        document.querySelector('#tambah-pertanyaan-preview-title').textContent = "Judul Pertanyaan";
    }
})

function tambahselectlistener() {
    tambahinputpreview.forEach(input => {
        input.classList.add('hide');
    })
    var isian = tambahselect.value;
    if (isian == "textarea") {
        tambahopsigroup.classList.add('hide');
        tambahformpreview.querySelector('textarea').classList.remove('hide');
    } else if (isian == "select") {
        tambahformpreview.querySelector('select').classList.remove('hide');
        tambahopsigroup.classList.remove('hide');
    } else {
        tambahopsigroup.classList.add('hide');
        tambahformpreview.querySelector('input').classList.remove('hide');
        tambahformpreview.querySelector('input').setAttribute('type', isian);
        tambahformpreview.querySelector('input').removeAttribute('disabled');
    }
}

tambahselect.addEventListener('input', () => {
    tambahselectlistener();
})

function tambahselectopsilitsener() {
    var select = tambahformpreview.querySelector('select');
    select.querySelectorAll('option').forEach(option => {
        select.removeChild(option);
    });

    var opsian = tambahopsifield.value.split(",");

    var defaultoption = document.createElement('option');
    defaultoption.setAttribute('disabled', 'true');
    defaultoption.setAttribute('selected', 'true');
    defaultoption.setAttribute('value', null);
    defaultoption.textContent = 'pilih';
    select.appendChild(defaultoption);

    opsian.forEach(opsi => {
        var opsiinject = document.createElement('option');
        opsiinject.value = opsi;
        opsiinject.textContent = opsi;

        select.appendChild(opsiinject);
    });
}

tambahopsifield.addEventListener('input', () => {
    tambahselectopsilitsener()
});

var jawabanrow = document.querySelectorAll('.jawaban-row');
const paginaterow = document.querySelector('#jawaban-row-pagination');
const showby = document.querySelector('#show-by');
// var showval = showby.value;
var showval = 10;
var pagenow = 1;
var jmlhpage = Math.ceil(jawabanrow.length / showval);



function setbtnpage(text, page = null, active = false) {
    var btnpage = document.createElement('SPAN');
    if (text == 'separator') {
        btnpage.classList.add('btn-page-separator');
        btnpage.textContent = '...';
    } else {
        btnpage.classList.add('btn-page');
        btnpage.textContent = text;
        btnpage.setAttribute('data-page', page);
        if (active) {
            btnpage.classList.add('active');
        }
    }
    paginaterow.appendChild(btnpage)
}

function generatepage() {
    paginaterow.querySelectorAll('span').forEach(btndelete => {
        paginaterow.removeChild(btndelete);
    });
    jmlhpage = Math.ceil(jawabanrow.length / showval);
    paginaterow.classList.remove('hide');
    if (jmlhpage < 4) {
        for (let page = 1; page <= jmlhpage; page++) {
            if (page == 1) {
                setbtnpage(page, page, true)
            } else {
                setbtnpage(page, page)
            }
        }
    } else if (jmlhpage >= 4) {
        setbtnpage(1, 1, true);
        setbtnpage(2, 2);
        setbtnpage('separator');
        setbtnpage(jmlhpage, jmlhpage);
    }
}

function setjawabanpage() {
    jawabanrow.forEach(element => {
        element.classList.add('hide');
    });
    for (let page = (pagenow * showval) - showval; page < pagenow * showval; page++) {
        if (jawabanrow[page]) {
            jawabanrow[page].classList.remove('hide');
        }
    }
}

function selectpage(page) {
    pagenow = Number(page)
    if (page == 1) {
        setbtnpage(pagenow, pagenow, true)
        setbtnpage(pagenow + 1, pagenow + 1)
        setbtnpage('separator')
        setbtnpage(jmlhpage, jmlhpage)
    } else if (page == 2) {
        setbtnpage(pagenow - 1, pagenow - 1)
        setbtnpage(pagenow, pagenow, true)
        setbtnpage(pagenow + 1, pagenow + 1)
        setbtnpage('separator')
        setbtnpage(jmlhpage, jmlhpage)
    } else if (page == jmlhpage) {
        setbtnpage(1, 1)
        setbtnpage('separator')
        setbtnpage(pagenow - 1, pagenow - 1)
        setbtnpage(pagenow, pagenow, true)
    } else if (page == jmlhpage - 1) {
        setbtnpage(1, 1)
        setbtnpage('separator')
        setbtnpage(pagenow - 1, pagenow - 1)
        setbtnpage(pagenow, pagenow, true)
        setbtnpage(pagenow + 1, pagenow + 1)
    } else {
        setbtnpage(1, 1)
        setbtnpage('separator')
        setbtnpage(pagenow - 1, pagenow - 1)
        setbtnpage(pagenow, pagenow, true)
        setbtnpage(pagenow + 1, pagenow + 1)
        setbtnpage('separator')
        setbtnpage(jmlhpage, jmlhpage)
    }
    setjawabanpage();
    pagelistener();
}

function pagelistener() {
    var btnpage = document.querySelectorAll('.btn-page');
    btnpage.forEach(btn => {
        btn.addEventListener('click', (e) => {
            var pageselect = btn.dataset.page;
            if (pageselect != pagenow) {
                paginaterow.querySelectorAll('span').forEach(btndelete => {
                    paginaterow.removeChild(btndelete);
                });
                if (jmlhpage < 4) {
                    pagenow = Number(pageselect)
                    for (let pageloop = 1; pageloop <= jmlhpage; pageloop++) {
                        if (pageloop == pageselect) {
                            setbtnpage(pageloop, pageloop, true)
                        } else {
                            setbtnpage(pageloop, pageloop)
                        }
                    }
                    setjawabanpage();
                    pagelistener();
                } else {
                    selectpage(pageselect)
                }
            }
        });
    });
}

function startpaginate() {
    jawabanrow = document.querySelectorAll('.jawaban-row');
    if (jawabanrow.length > showval) {
        jawabanrow.forEach(row => {
            row.classList.add('hide');
        });
        generatepage();
        pagelistener();
        for (let i = (pagenow * showval) - showval; i < pagenow * showval; i++) {
            if (jawabanrow[i]) {
                jawabanrow[i].classList.remove('hide');
            }
        }
        paginaterow.querySelector('span').click();
    }
}

startpaginate();

// showby.addEventListener('input', () => {
//     console.log(showby.value);
//     showval = showby.value
//     startpaginate();
// });

/*

jika page < 4 {
    tampilkan page[0..last] => (1,2,3) || (1,2)
}else (page > 4){
    jika (now == first){
        tampilkan first.active, first+1, separator, last, next
    }else (now == first+1){
        tampilkan first, now.active, now+1, separator, last, next
    }else (now == last){
        tampilkan prev, first, separator, last-1, last.active
    }else (now == last-1){
        tampilkan prev, first, separator, now-1, now.active, last
    }else {
        tampilkan prev, first, separator, now-1, now, now+1, separator, last, next
    }
}

*/

const editbtn = document.querySelectorAll('.list-pertanyaan table tbody tr td a.edit');

editbtn.forEach(button => {
    button.addEventListener('click', () => {
        var themodal = document.querySelector(button.dataset.modal);
        console.log(themodal);
        themodal.querySelector('#tambah-pertanyaan-title').value = button.dataset.quest;
        // themodal.querySelectorAll('#tambah-pertanyaan-jenis').value = button.dataset.tipe;
        themodal.querySelectorAll('#tambah-pertanyaan-jenis option').forEach(option => {
            if (option.value == button.dataset.tipe) {
                option.setAttribute('selected', 'true');
                option.click();
            }
        });
        tambahselectlistener();
        themodal.querySelectorAll('#tambah-pertanyaan-wajib option').forEach(option => {
            if (option.value == "ya" && button.dataset.wajib == "1") {
                option.setAttribute('selected', 'true');
            } else if (option.value == "tidak" && button.dataset.wajib == "0") {
                option.setAttribute('selected', 'true');
            }
        })
        themodal.querySelector('#tambah-pertanyaan-opsi').textContent = button.dataset.opsi
        tambahselectopsilitsener()
        themodal.querySelector('#tambah-pertanyaan-unique').value = button.dataset.unique
        themodal.querySelector('form').setAttribute('action', button.dataset.link);
    })
});

document.querySelector('#btn-tambah-pertanyaan').addEventListener('click', (e) => {
    document.querySelector(e.target.dataset.modal).querySelector('form').setAttribute('action', e.target.dataset.link);
})

function cekregex(string) {
    var a = /[a-z]/i
    var b = /[0-9]/
    var result = []
    str = string.split('');
    str.forEach(char => {
        if (a.exec(char) || b.exec(char)) {
            result.push(char)
        }
    });

    return result.join('');
}


document.querySelector('input#shortlink').addEventListener('input', (e) => {
    var shortlinkval = e.target.value
    document.querySelector('input#valid-shortlink').value = cekregex(shortlinkval);
    console.log(cekregex(shortlinkval));
    if (cekregex(shortlinkval) == "") {
        document.querySelector('small#preview-shortlink').classList.add('form-error');
        document.querySelector('small#preview-shortlink').textContent = "hanya boleh mengandung [A-Z] [a-z] [0-9]";
    } else {
        document.querySelector('small#preview-shortlink').classList.remove('form-error');
        document.querySelector('small#preview-shortlink').textContent = "himsiunair.com/f/" + cekregex(shortlinkval);
    }
})

document.querySelectorAll('.btn-delete-pertanyaan').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        button.parentElement.querySelector('form').submit();
    })
})
