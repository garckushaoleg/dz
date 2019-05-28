$(function () {
  const URL_SEARCH_USERS = 'https://api.github.com/search/users?q=';
  const URL_USERS = 'https://api.github.com/users/';
  let $githubUser = $('.githubUser');
  let githubUserTemplate = $('#githubUserTemplate').html();

  //Показать данные пользователя
  function showUserDetails(message) {
    $githubUser.html(githubUserTemplate.replace('{{avatar_url}}', message.avatar_url)
      .replace('{{name}}', message.name)
      .replace('{{html_url}}', message.html_url)
      .replace('{{login}}', message.login)
      .replace('{{public_repos}}', message.public_repos)
      .replace('{{followers}}', message.followers)
      .replace('{{created_at}}', generateDate(message.created_at)));
  }

  //Сформировать дату
  function generateDate(startDateView) {
    let date = new Date(startDateView);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

  //Сформировать список логинов
  function createListOfLogins(data) {
    return data.items.map((item) => item.login);
  }


  $("#selectionOfUsers").autocomplete({
    source: function (request, response) {
      jQuery.get(URL_SEARCH_USERS + request.term).done(data => response(createListOfLogins(data)));
    },
    minLength: 2,
    select: function (event, ui) {
      jQuery.get(URL_USERS + ui.item.label).done(data => showUserDetails(data));
    }
  });
});