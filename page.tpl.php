<?php
?>
<div id="site">
    <div id="navigation-wrapper" class="clearfix">
        <div class="page-wrapper">
        <?php if($page['navigation']): ?>
            <div id="navigation">
                <?php print render ($page['navigation']); ?>
            </div>
        <?php endif; ?>
        </div>
    </div> 
    <div class="page-wrapper">
        <div id="content-wrapper" class="clearfix">
            <?php if($page['content']): ?>
                <div id="content">
                    <?php print render ($page['content']); ?>
                </div>
            <?php endif; ?>
        </div> 

        <div id="footer-wrapper" class="clearfix">
            <?php if($page['footer']): ?>
                <div id="footer">
                    <?php print render ($page['footer']); ?>
                </div>
            <?php endif; ?>
        </div> <!-- end footer wrapper --> 
    </div>
</div>