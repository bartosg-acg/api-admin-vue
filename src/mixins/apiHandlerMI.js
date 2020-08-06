/*
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

// A config-ba ha a hívó paramétereket akar, akkor azokat a params objektumba pakolja, mivel ide más is jöhet az axios-nak pl: headers, stb

Példa:

let url = "newsletter";

let data = {
    first_name: "first name",
    last_name: "last name",
    email: "test@test.hu",
    condition: "accepted"
};

let config = {
    params: {
        alma: "gomba",
        kurtos: "alma"
    }
};

Hívások:
get(url, config);
post(url, data, config);
put(url, data, config);
delete(url, config);
*/

export default {
    methods: {
        get: function (url, config, success, error_func) {
            var _this = this;
            var myid = Math.floor(Math.random() * 100000);
            _this.$store.state.apiCalls[myid] = {
                type: 'GET',
                style: 'primary',
                status: 'sent',
                url: url,
                progress: 0,
            }
            _this.$forceUpdate();

            if (!config) {
                config = {};
            }

            if (!config.params) {
                config.params = {};
            } else {
                config.params = _this.processParamsData(config.params);
            }

            config.params.language_id = _this.$store.state.language_id;

            if (this.$store.state.token && config.params.token == undefined) {
                config.params.token = this.$store.state.token;
            }

            this.$axios.get(_this.CONFIG.apiUrl + url, config).then((result) => {
                this.successHandeling(_this, myid, result, success, error_func);

            }).catch(error => {
                this.errorHandling(_this, myid, error, error_func);
            })
        },

        delete: function (url, config, success, error_func) {
            var _this = this;
            var myid = Math.floor(Math.random() * 100000);
            _this.$store.state.apiCalls[myid] = {
                type: 'DELETE',
                style: 'primary',
                status: 'sent',
                url: url,
                progress: 0,
            }
            _this.$forceUpdate();

            if (!config) {
                config = {};
            }

            if (!config.params) {
                config.params = {};
            } else {
                config.params = _this.processParamsData(config.params);
            }

            config.params.language_id = _this.$store.state.language_id;

            if (this.$store.state.token && config.params.token == undefined) {
                config.params.token = this.$store.state.token;
            }

            this.$axios.delete(_this.CONFIG.apiUrl + url, config).then((result) => {
                this.successHandeling(_this, myid, result, success, error_func);

            }).catch(error => {
                this.errorHandling(_this, myid, error, error_func);
            })
        },

        post: function (url, data, config, success, error_func) {
            var _this = this;

            var myid = Math.floor(Math.random() * 100000);

            _this.$store.state.apiCalls[myid] = {
                type: 'POST',
                style: 'warning',
                status: 'sent',
                url: url,
                progress: 0,
            }
            _this.$forceUpdate();

            if (!config) {
                config = {};
            }

            if (!config.params) {
                config.params = {};
            } else {
                config.params = _this.processParamsData(config.params);
            }

            config.params.language_id = _this.$store.state.language_id;

            if (this.$store.state.token && config.params.token == undefined) {
                config.params.token = this.$store.state.token;
            }

            config.onUploadProgress = function (progressEvent) {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                _this.$store.state.apiCalls[myid].progress = percentCompleted;
            }

            _this.$axios.post(_this.CONFIG.apiUrl + url, data, config).then((result) => {
                this.successHandeling(_this, myid, result, success, error_func);

            }).catch(error => {
                this.errorHandling(_this, myid, error, error_func);
            })
        },

        put: function (url, data, config, success, error_func) {
            var _this = this;

            var myid = Math.floor(Math.random() * 100000);

            _this.$store.state.apiCalls[myid] = {
                type: 'PUT',
                style: 'warning',
                status: 'sent',
                url: url,
                progress: 0,
            }
            _this.$forceUpdate();

            if (!config) {
                config = {};
            }

            if (!config.params) {
                config.params = {};
            } else {
                config.params = _this.processParamsData(config.params);
            }

            config.params.language_id = _this.$store.state.language_id;

            if (this.$store.state.token && config.params.token == undefined) {
                config.params.token = this.$store.state.token;
            }

            config.onUploadProgress = function (progressEvent) {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                _this.$store.state.apiCalls[myid].progress = percentCompleted;
            }

            _this.$axios.put(_this.CONFIG.apiUrl + url, data, config).then((result) => {
                this.successHandeling(_this, myid, result, success, error_func);

            }).catch(error => {
                this.errorHandling(_this, myid, error, error_func);
            })
        },

        successHandeling: function (_this, myid, result, success, error_func) {

            if (result.data.status == false) {
                if (error_func) {
                    error_func(result);
                }
                _this.$store.state.apiCalls[myid].status = 'error'
                _this.$forceUpdate();
                return;
            }
            else {
                if (success) {
                    success(result);
                }
                _this.$store.state.apiCalls[myid].status = 'success';
                _this.$forceUpdate();
                return;
            }
        },
        errorHandling: function (_this, myid, error, error_func) {
            console.log(error);

            if (error.response.data.error.token == 'Token is invalid or expired!') {
                localStorage.removeItem('token');
                this.$store.state.token = undefined;
                this.$router.push('/');
                return;
            }
            if (error_func) {

                error_func(error);

            }
            _this.$store.state.apiCalls[myid].status = 'error'
            _this.$forceUpdate();
        },
        processParamsData: function (obj) {
            var ret = {};
            for (var i in obj) {
                if (Array.isArray(obj[i]) || obj === Object(obj))
                    Object.assign(ret, this.processParamsDataRecoursive(i, (obj[i])));
                else
                    ret[i] = obj[i]

            }
            return ret;
        },
        processParamsDataRecoursive: function (prefix, obj) {
            var ret = {};
            if (Array.isArray(obj[i]) || obj === Object(obj)) {
                for (var i in obj) {
                    Object.assign(ret, this.processParamsDataRecoursive(prefix + "[" + i + "]", (obj[i])));
                }
            }
            else {
                ret[prefix] = obj;
            }
            return ret;
        },
        test: function () {
            console.log(this.processParamsData({ where: [['where', 'id', 11], ['where', 'type', 'active']], select: '*' }));
        }


    }
}