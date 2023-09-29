
$(document).ready(function () {
    $('#recipes, .loader').hide();

    $('.container').on('submit','#form', function(e){
        e.preventDefault();
        let recipe = $('#recipe').val();

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/recipe?query=' + recipe,
            headers: { 'X-Api-Key': 'JSs8KwGOqrBHjCkA+Jn1YQ==2reh3TkfBRehJsjI' },
            contentType: 'application/json',
            beforeSend: function() {
                $(".loader").show();
            },
            success: function(result) {
                if(!$.isEmptyObject(result)){
                    $(".loader").hide();
                    renderHTML(result);
                }else{
                    $('#recipes-list').html("No recipes found.").show();
                    $(".loader, .searchresult, #recipes").hide();
                }
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });

        function renderHTML(data) {
            $('#recipes-list').fadeIn();
            $('#recipes').hide();
            
            let listRecipe = "";
            for (let i = 0; i < data.length; i++) {
                listRecipe += "<li><span>" + data[i].title + "</span>";
                listRecipe += "<span>" + data[i].servings + "</br>";
                listRecipe +=  data[i].ingredients.split('|').length + " Ingredients</span>";
                listRecipe += '<a href="" class="cuisine" data-id="'+ data[i].title +'">Get Recipe <i class="fa-solid fa-arrow-right"></i></a></li>';
                
                $('#recipes-list').on('click','.cuisine', function(e){
                    e.preventDefault();
                    $('#recipes-list').hide();

                    let cuisine = $(this).attr("data-id");
                    let viewRecipe = "";
                    viewRecipe += "<a href='#'><i class='fa-solid fa-arrow-left'></i> Back</a>";

                    if(cuisine == data[i].title){
                        viewRecipe += "<div>";
                        viewRecipe += " <div class='ingredients-section'>";
                        viewRecipe += " <h2>" + data[i].title + "</h2>";
                        viewRecipe += "     <p> <i class='fa-solid fa-utensils'></i> " + data[i].servings + "</p>";
                        viewRecipe += "     <h3>Ingredients</h3>";
                        viewRecipe += "     <p>" + data[i].ingredients.split('|').join('<br>') + "</p>";
                        viewRecipe += " </div>";
                        viewRecipe += " <div class='instructions-section'>";
                        viewRecipe += "     <h3>Instructions</h3>";
                        viewRecipe += "     <ol class='ingredients'><li>" + data[i].instructions.split('.').join('.</li><li>') + "</li></ol>";
                        viewRecipe += " </div>";
                        viewRecipe += "</div>";

                        $('#recipes').fadeIn().html(viewRecipe);
                        $('.searchresult').hide();

                        // to remove empty texts or numbers "ex: 2." on <li> tags
                        $('.ingredients li').each(function(idx, li) {
                            if($(li).text().length < 4){
                                $(li).hide();
                            }
                        });
                    }
                }); 
            }

            $('.searchresult').html("Search results for: <b>" + recipe + "</b>").fadeIn();
            $('#recipes-list').html(listRecipe);

            $('#recipes ').on('click','a', function(e){
                e.preventDefault();
                $('#recipes-list').fadeIn();
                $('#recipes').hide();
                $('.searchresult').fadeIn();
            });
        }
       
    });


     
});