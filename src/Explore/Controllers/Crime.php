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
* Crime controller for getting crime data for the site.
*/
class Crime
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
        $crime = [
            '0' => [
                'lat' => '34.956712',
                'long' => '-78.263928',
                'severity' => '1'
            ],
            '1' =>[
                'lat' => '36.956712',
                'long' => '-76.263928',
                'severity' => '4'
            ],
            '2' => [
                'lat' => '38.956712',
                'long' => '-71.263928',
                'severity' => '1'
            ],
            '3' => [
                'lat' => '32.956712',
                'long' => '-69.263928',
                'severity' => '1'
            ],
            '4' => [
                'lat' => '34.956712',
                'long' => '-77.263928',
                'severity' => '3'
            ],
            '5' => [
                'lat' => '40.956712',
                'long' => '-79.263928',
                'severity' => '2'
            ],
            '6' => [
                'lat' => '45.956712',
                'long' => '-69.263928',
                'severity' => '1'
            ],
            '7' => [
                'lat' => '32.956712',
                'long' => '-78.263928',
                'severity' => '5'
            ],
            '8' => [
                'lat' => '32.956712',
                'long' => '-77.263928',
                'severity' => '3'
            ],
            '9' => [
                'lat' => '38.956712',
                'long' => '-78.263928',
                'severity' => '2'
            ],
            '10' => [
                'lat' => '35.956712',
                'long' => '-65.263928',
                'severity' => '4'
            ],
        ];
        
        return new Response($crime, 201);
    }
}
