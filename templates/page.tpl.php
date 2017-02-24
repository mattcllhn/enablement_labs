<?php
?>
<div id="offside-navigation-wrapper" class="clearfix">
  <?php if($page['navoffside']): ?>
    <div id="offside-navigation">
      <?php print render ($page['navoffside']); ?>
    </div>
  <?php endif; ?>
</div>
<div id="site">
  <div id="navigation-wrapper" class="clearfix">
    <!--<div class="page-wrapper">-->
      <?php if($page['navigation']): ?>
        <div id="navigation">
          <?php print render ($page['navigation']); ?>
        </div>
      <?php endif; ?>
    <!--</div>-->
  </div>
  <div class="main-content-wrapper">
    <div id="content-wrapper" class="clearfix">
      <div class="tab-wrapper">
      <?php if ($tabs): ?>
        <div class="tabs">
          <?php print render($tabs); ?>
        </div>
      <?php endif; ?>
      <?php if($page['content']): ?>
        <div id="content">
          <?php print render ($page['content']); ?>
        </div>
      <?php endif; ?>
      </div>
    </div>
  </div>
  <div class="secondary-offsides page-wrapper clearfix">
    <div id="offside-wrapper" class="clearfix">
      <?php if($page['offside']): ?>
        <div id="offside">
          <?php print render ($page['offside']); ?>
        </div>
      <?php endif; ?>
    </div>
    <!--<div class="page-wrapper">-->
      <div id="secondary-content-wrapper" class="clearfix">
        <?php if($page['content2']): ?>
          <div id="content2">
            <?php print render ($page['content2']); ?>
          </div>
        <?php endif; ?>
      </div>
    <!--</div>-->
  </div>
  <div class="footer-parent-wrapper">
    <div id="footer-wrapper" class="clearfix">
      <?php if($page['footer']): ?>
        <div id="footer">
          <?php print render ($page['footer']); ?>
        </div>
      <?php endif; ?>
    </div> <!-- end footer wrapper -->
  </div>
</div>
