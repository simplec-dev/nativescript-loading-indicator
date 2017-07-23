"use strict";
var application = require("application");
var LoadingIndicator = (function () {
    function LoadingIndicator() {
    }
    LoadingIndicator.prototype.show = function (options) {
        var context = this._getContext();
        if (context) {
            if (typeof options === 'undefined')
                options = {};
            
            var progressStyle = 0;
            if (options.android && options.android.progressStyle) {
                progressStyle = options.android.progressStyle;
            }
            if (typeof this._progressDialog === 'undefined' || this._progressStyle!=progressStyle) {
                if (this._progressDialog) {
                    this._progressDialog.hide();
                    this._progressDialog.dismiss();
                }
                this._progressDialog = new android.app.ProgressDialog(context);
            }

            {
                var cancelable = false;
                if (options.android.cancelable !== undefined)
                       cancelable = options.android.cancelable;

                // options
                if (options.message) {
                    this._progressDialog.setMessage(options.message);
                }
                if (options.progress)
                    this._progressDialog.setProgress(options.progress);
                // android specific
                if (options.android) {
                    this._progressDialog.setCancelable(cancelable);
                    if (options.android.indeterminate)
                        this._progressDialog.setIndeterminate(true);
                    if (options.android.max)
                        this._progressDialog.setMax(options.android.max);
                    if (options.android.progressNumberFormat)
                        this._progressDialog.setProgressNumberFormat(options.android.progressNumberFormat);
                    if (options.android.progressPercentFormat)
                        this._progressDialog.setProgressPercentFormat(options.android.progressPercentFormat);
                    if (options.android.progressStyle) {
                        this._progressStyle = options.android.progressStyle;
                        this._progressDialog.setProgressStyle(options.android.progressStyle);
                    }
                    if (options.android.secondaryProgress)
                        this._progressDialog.setSecondaryProgress(options.android.secondaryProgress);
                }
                this._progressDialog.show();
            }
            return this._progressDialog;
        }
    };
    LoadingIndicator.prototype.hide = function () {
        if (typeof this._progressDialog !== 'undefined') {
            this._progressDialog.hide();
            this._progressDialog.dismiss();
        }
        this._progressDialog = undefined;
    };
    LoadingIndicator.prototype._getContext = function () {
        return application.android.currentContext;
    };
    return LoadingIndicator;
}());
exports.LoadingIndicator = LoadingIndicator;
