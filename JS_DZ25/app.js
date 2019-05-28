$(function () {
  let githubUser = $('.githubUser');
  let githubUserTemplate = $('#githubUserTemplate').html();

  //Показать данные пользователя
  function showUserDetails(message) {
    let date = new Date(message.created_at);
    date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

    githubUser.html(githubUserTemplate.replace('{{avatar_url}}', message.avatar_url)
      .replace('{{name}}', message.name)
      .replace('{{html_url}}', message.html_url)
      .replace('{{login}}', message.login)
      .replace('{{public_repos}}', message.public_repos)
      .replace('{{followers}}', message.followers)
      .replace('{{created_at}}', date));
  }

  //Сформировать список логинов
  function createListOfLogins(data) {
    let userLoginArray = [];
    for (let i = 0; i < data.items.length; i++) {
      userLoginArray.push(data.items[i].login);
    }
    return userLoginArray;
  }


  $("#selectionOfUsers").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: "https://api.github.com/search/users?q=" + request.term,
        type: "GET",
        success: function (data) {
          response(createListOfLogins(data));
        }
      });
    },
    minLength: 2,
    select: function (event, ui) {
      $.ajax({
        url: "https://api.github.com/users/" + ui.item.label,
        type: "GET",
        success: function (data) {
          showUserDetails(data);
        }
      });
    }
  });
});