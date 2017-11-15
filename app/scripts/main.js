var myApp = function() {

    var searchArtist = function() {
        $('#btn_serach').on('click', function() {

            $('#searchModal').modal('show');

        });
        $('#formSubmit').on('click', function(e) {
            e.preventDefault();
            if ($('.form-horizontal').valid()) {

                var SearchArtistName = $('#artistName').val();
                var SearchNoOfTrack = $('#noOftracks').val();

                var response = {};

                $('.search-result').empty();
                // var tempData = 'http://192.168.0.189:8080/testdata/1.json';
                $.ajax({
                    type: 'POST',
                    url: '//itunes.apple.com/search?term=' + SearchArtistName + '&limit=' + SearchNoOfTrack + '',
                    crossDomain: true,

                    success: function(res) {

                        if (typeof res == 'object') {
                            response = res;
                        } else {
                            response = $.parseJSON(res)
                        }
                        var tmpHtml = '';
                        var tmpHead = '';
                        if (response.resultCount !== 0) {

                            for (var i = 0; i < response.resultCount; i++) {

                                tmpHtml += '<div class="media">\
                                <div class="media-left media-middle">\
                                    <img alt=' + response.results[i].kind + ' class="media-object img-circle " src= ' + response.results[i].artworkUrl100 + '>\
                                </div>\
                                <div class="media-body">\
                                    <h4 class="artist-name">Artist name: ' + response.results[i].artistName + '</h4>\
                                    <h4 class="track-name">Track name: ' + response.results[i].trackName + '</h4>\
                                    <p class="media-detail"> ' + response.results[i].longDescription + '</p>\
                                  </div>\
                              </div>';

                            }

                        } else {

                            tmpHtml = '<div class="alert alert-info "> NO Result found. </div>';
                        }
                        tmpHead = '<h3 class="search-heading">Search Result for 	&ldquo;<span class="search-term">' + SearchArtistName + '</span>&rdquo;.\
                             <span><a href="#" class="clear-search">( Clear )</a></span></h3>'
                        $('.search-result').append(tmpHead);
                        $('.search-result').append(tmpHtml);
                        $('.search-result').css('display', 'block')
                        $('.btn-action-container').css('display', 'none')

                        $('#searchModal').modal('hide');

                    },
                    error: function() {
                        alert('Error');
                    }
                });
            }
            return false;
        });

    }

    var clearSearch = function() {

        $('.search-result').on('click', '.clear-search', function() {
            $('.btn-action-container').css('display', 'block')
            $('.search-result').empty().css('display', 'none');

        });

        $('#searchModal').on('hidden.bs.modal', function(e) {
            $('.form-horizontal')[0].reset();
        })

    }
    return {
        init: function() {

            searchArtist();
            clearSearch();
        }
    }

}();
jQuery(document).ready(function() {
    myApp.init();
});