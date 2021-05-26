const Editor = require('./editor');
const UIkit = require('uikit');
const Vue = require('vue/dist/vue.min');
const axios = require('axios');

window.editor = new Editor ();

window.vue = new Vue ({
    el: "#app",
    data : {
        page: "index.html",
        showLoader: false,
        auth: false,
        password: "",
        loginError: false,
        pageList: [],
        backupList: [],
        meta: {
            title: '',
            keyword: '',
            description: '',
        }

    },
    methods: {

        btnSave () {
            this.showLoader = true;
            window.editor.save(
                () => {
                    this.showLoader = false;
                    UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
                },
                () => {
                    this.showLoader = false;
                    UIkit.notification({message: 'Ошибка сохранения!', status: 'danger'})
                });

        },

        openPage (page) {
            this.page = page;
            this.loadBackUpList();
            this.showLoader = true;
            window.editor.open(this.page, () => {
                this.showLoader = false;
                this.meta = window.editor.metaEditor.getMeta();
            });
        },

        loadBackUpList () {
            axios
                .get('./backups/backups.json')
                .then((res) => {
                        this.backupList = res.data.filter((backup) => {

                            return(backup.page === this.page)

                    })
                })

        },

        restoreBackup (backup) {
            UIkit.modal.confirm("Вы действительно хотите восстановить страницу из этой резервной копии?",
                {labels: {ok: "Восстановить", cancel: "Отменить"}})
                .then(() => {
                    return axios.post('./api/restoreBackup.php', {"file": backup.file, "page": this.page})
                        .then(() => {

                            this.showLoader = true;

                            this.openPage(this.page);

                            this.notification('Успешно восстановлено!', 'success');

                        })
                        .catch(() => {

                            this.notification('Ошибка восстановления!', 'danger');

                        })
                });
        },

        applyMeta () {

            let title = this.meta.title,
                description = this.meta.description,
                keywords = this.meta.keyword;

            window.editor.metaEditor.setMeta(title, description, keywords);
        },

        login () {
            if(this.password.length > 5) {
                axios
                    .post('./api/login.php', {"password": this.password})
                    .then((res) => {
                        if(res.data.auth === true){
                            this.auth = true;
                            this.startEditing();
                        }else {
                            this.loginError = true;
                        }
                    })

            }else{
                this.loginError = true;
            }
        },

        logout () {

            axios
                .get('./api/logout.php')
                .then((res) => {
                    window.location.replace('/');
                })

        },
        startEditing () {
            this.openPage(this.page);
            axios
                .get("./api/pageList.php")
                .then((res) => {
    
                   this.pageList = res.data;
    
                })
    
            this.loadBackUpList();

        },
        enableLoader () {

            this.showLoader = true;

        },

        disableLoader () {

            this.showLoader = false;

        },

        notification (message, status) {

            UIkit.notification({message: message, status: status});

        },

    },
    created() {
        axios
            .get('./api/checkAuth.php')
            .then((res) => {

                if(res.data.auth === true) {

                    this.auth = true;

                    this.startEditing();
                } 

            
            })
    }
})

