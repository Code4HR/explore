<?php
/**
 * Controller implementation.
 *
 * @package EXPLOREHR/Controllers
 */
namespace EXPLOREHR\Controllers;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Main controller for root level of site.
 */
class Main
{
    /**
     * Entry point for the root level page.
     *
     * @param Request     $req The request object.
     * @param Application $app Silex application object.
     *
     * @return Response
     */
    public function main(Request $req, Application $app)
    {
        return $app['twig']->render('mainPage.twig', array(
            'title' => 'Explore Hampton Roads'
        ));
    }
}
