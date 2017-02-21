<?php
/**
 * Mini Pager override
 * @see /public_html/drupal/sites/all/modules/views/theme/theme.inc
 */
function enablement_views_mini_pager($vars) {
  global $pager_page_array, $pager_total, $row;

  $tags = $vars['tags'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];

  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  if ($pager_total[$element] > 1) {

    $li_previous = theme('pager_previous',
      array( 
        'text' => '<span class="fa fa-chevron-left"></span>',
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
        'text' => '<span class="fa fa-chevron-right"></span>',
        'element' => $element,
        'interval' => 1,
        'parameters' => $parameters,
      )
    );

    if (empty($li_next)) {
      $li_next = "&nbsp;";
    }

    $items[] = array(
      'class' => array('chapter-navigation pager-previous'),
      'data' => '<div id="chapter-back">'. $li_previous . '</div>',
    );

    $items[] = array(
      'class' => array('chapter-title'),
      'data' => t('@current of @max', array('@current' => $pager_current, '@max' => $pager_max)),
    );

    $items[] = array(
      'class' => array('chapter-navigation pager-next'),
      'data' => '<div id="chapter-forward">'. $li_next . '</div>',
    );

     $variables = array(
        'items' => $items,
        'title' => NULL,
        'attributes' => array('class' => array('pager')),
      );

      return custom_chapter_pager($variables);

  }
}

function custom_chapter_pager($variables){
    $items = $variables['items'];
    $title = $variables['title'];
    $attributes = $variables['attributes'];

     $output = '<div class="chapter-pager">';
    if (isset($title) && $title !== '') {
        $output .= '<span class="chapter-title"><h3>' . $title . '</h3></span>';
     }
     if (!empty($items)) {
        $num_items = count($items);
        $i = 0;
        foreach ($items as $item) {
          $attributes = array();
          $children = array();
          $data = '';
          $i++;
            if (is_array($item)) {
                foreach ($item as $key => $value) {
                  if ($key == 'data') {
                    $data = $value;
                  }
                  elseif ($key == 'children') {
                    $children = $value;
                  }
                  else {
                    $attributes[$key] = $value;
                  }
                }

            }else {
              $data = $item;
            }

          if ($i == 1) {
            $attributes['class'][] = 'first';
          }
          if ($i == $num_items) {
            $attributes['class'][] = 'last';
          }
          $output .= '<span'  . drupal_attributes($attributes) .'>' . $data . "</span>\n";
          }
     }
      $output .= '</div>';
      return $output;

}
/**
 * Override what goes inside the pager link '<a>' tags.
 * Allow HTML tags to be returned inside tag
 * @author: Carter Gruss
 */
function enablement_pager_link($variables) {
  $text = $variables['text'];
  $page_new = $variables['page_new'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $attributes = $variables['attributes'];

  $page = isset($_GET['page']) ? $_GET['page'] : '';
  if ($new_page = implode(',', pager_load_array($page_new[$element], $element, explode(',', $page)))) {
    $parameters['page'] = $new_page;
  }

  $query = array();
  if (count($parameters)) {
    $query = drupal_get_query_parameters($parameters, array());
  }
  if ($query_pager = pager_get_query_parameters()) {
    $query = array_merge($query, $query_pager);
  }

  // Set each pager link title
  if (!isset($attributes['title'])) {
    static $titles = NULL;
    if (!isset($titles)) {
      $titles = array(
        t('« first') => t('Go to first page'),
        t('‹ previous') => t('Go to previous page'),
        t('next ›') => t('Go to next page'),
        t('last »') => t('Go to last page'),
      );
    }
    if (isset($titles[$text])) {
      $attributes['title'] = $titles[$text];
    }
    elseif (is_numeric($text)) {
      $attributes['title'] = t('Go to page @number', array('@number' => $text));
    }
  }

  // @todo l() cannot be used here, since it adds an 'active' class based on the
  //   path only (which is always the current path for pager links). Apparently,
  //   none of the pager links is active at any time - but it should still be
  //   possible to use l() here.
  // @see http://drupal.org/node/1410574
  $attributes['href'] = url($_GET['q'], array('query' => $query));

  /**
   * Removed the call to the check_plain() function, which strips out 
   * HTML tags passed in. 
   * @link: http://drupal.stackexchange.com/questions/68488/html-inside-mini-pager-navigation-control-labels-tag
   */
  return '<a' . drupal_attributes($attributes) . '>' . $text . '</a>';
}

?>