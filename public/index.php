<?php

require_once __DIR__ . '/../vendor/autoload.php';

$bootstrap = new EXPLOREHR\Bootstrap(new Silex\Application());

$bootstrap->loadConfig();

$bootstrap->startRenderEngine();

$bootstrap->registerRoutes();

$bootstrap->startupSite();
