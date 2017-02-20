<?php
/**
 * Mini Pager override
 * @see /public_html/drupal/sites/all/modules/views/theme/theme.inc
 */
 function phptemplate_preprocess_page(&$vars) {
    global $user;

error_log(">>>>>> phptemplate_preprocess_page() hook called");
error_log(print_r($var['primary_links'], TRUE));

    if ($user->uid != 0) {
      // code for the account and logout links
      $vars['primary_links']['account-link'] = Array (
          'attributes' => Array('title' => 'Account link'),
          'href' => '?q=user',
          'title' => t('Account')
      );
      $vars['primary_links']['logout-link'] = Array (
          'attributes' => Array('title' => 'Logout link'),
          'href' => 'logout',
          'title' => t('Logout')
      );
    }
    else {
      // code for the login links
      $vars['primary_links']['login-link'] = Array (
          'attributes' => Array('title' => 'Login link'),
          'href' => '/user',
          'title' => t('Login')
      );
    }

error_log("    >>>>>> AFTER phptemplate_preprocess_page() hook");
error_log(print_r($var['primary_links'], TRUE));

}
function theme_views_mini_pager($vars) {
  global $pager_page_array, $pager_total;

  $tags = $vars['tags'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];

  $view_title = get_title();
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  if ($pager_total[$element] > 1) {

    $li_previous = theme('pager_previous',
      array(
        'text' => (isset($tags[1]) ? $tags[1] : t('‹‹')),
        'element' => $element,
        'interval' => 1,
        'parameters' => $parameters,
      )
    );
    if (empty($li_previous)) {
      $li_previous = "&nbsp;";
    }

    $li_next = theme('pager_next',
      array(
        'text' => (isset($tags[3]) ? $tags[3] : t('››')),
        'element' => $element,
        'interval' => 1,
        'parameters' => $parameters,
      )
    );

    if (empty($li_next)) {
      $li_next = "&nbsp;";
    }

    $items[] = array(
      'class' => array('pager-previous'),
      'data' => $li_previous,
    );

    $items[] = array(
      'class' => array('pager-current'),
      'data' => t('@current of @max', array('@current' => $pager_current, '@max' => $pager_max)),
    );

    $items[] = array(
      'class' => array('pager-next'),
      'data' => $li_next,
    );


    return theme('item_list',
      array(
        'items' => $items,
        'title' => NULL,
        'type' => 'ul',
        'attributes' => array('class' => array('pager')),
      )
    );
  }
}
?>
