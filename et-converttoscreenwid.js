$(document).ready(function () {
    var fileName = window.location.href.split('/').pop(),
        widName = fileName.substr(0, fileName.indexOf('.')),
        params = {};

    if (typeof widforview != 'undefined') { params.widforview = widforview; }
    if (typeof widforbase != 'undefined') { params.widforbase = widforbase;}
    if (typeof widforbackground != 'undefined') { params.widforbackground = widforbackground; }
    if (typeof dataforview != 'undefined') { params.dataforview = dataforview; }
    if (typeof links != 'undefined') { params.links = links; }

    // append any existing style blocks to body before continuing
    $('style').each(function () { $('body').append(this.outerHTML); });

    // convert linked html page to a screenwid
    htmlToScreenwid(widName, $('body').html(), params);

    window.location = 'http://dripoint.com?wid=' + widName;
});