<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticIniteb6b22b00bd317dc5240d370ba1e4a02
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Stripe\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Stripe\\' => 
        array (
            0 => __DIR__ . '/..' . '/stripe/stripe-php/lib',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticIniteb6b22b00bd317dc5240d370ba1e4a02::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticIniteb6b22b00bd317dc5240d370ba1e4a02::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}