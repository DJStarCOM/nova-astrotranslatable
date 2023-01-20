# Nova Astrotomic Translatable

This [Laravel Nova](https://nova.laravel.com) field allows you to make any input field [astrotomic/laravel-translatable](https://github.com/astrotomic/laravel-translatable) compatible and localisable.

It is made from a fork from [Optimist Digital's](https://github.com/optimistdigital) [Laravel Nova Translatable](https://github.com/optimistdigital/nova-translatable) field, which is tailored for the Spatie Laravel Translatable package - so huge thanks to them, 99% of the work was made by them!

## Requirements

- `php: >=8.0`,
- `laravel/nova: ^4.0`
- `astrotomic/laravel-translatable: ^11.5`

## Features

- **Supports almost all fields** (including third party ones)
- **Supports default validation automatically**
- **Simple to implement** with minimal code changes (after `astrotomic/laravel-translatable` support)
- Locale tabs to switch between different locale values of the same field

## Known non-working fields

- `Image` and `File`

## Limitations

- The following methods can not be used, as this package uses them internally:
  - `resolveUsing`
  - `fillUsing`
  - `displayUsing` (might be fixed eventually)

## Screenshots

![Detail View](./docs/detail.png)

![Form View](./docs/form.png)

![Form View w/ Validation Errors](./docs/validation.png)

## Installation

Firstly, set up [astrotomic/laravel-translatable](https://github.com/astrotomic/laravel-translatable).

Install the package in a Laravel Nova project via Composer:

```bash
# Install nova-translatable
composer require DJStarCOM/nova-astrotranslatable

# Publish configuration (optional, but useful for setting default locales)
php artisan vendor:publish --tag="nova-translatable-config"
```

## Usage

Call `->translatable()` on any field, like so:

```php
// Any Nova field
Text::make('Name')
  ->rules('required', 'min:2')
  ->translatable(),

// Any third-party input field
Multiselect::make('Football teams')
  ->rules('required')
  ->translatable(),

// Optionally pass custom locales on a per-field basis
Number::make('Population')
  ->translatable([
    'en' => 'English',
    'et' => 'Estonian',
  ]),
```

## Validation

It's possible to define locale specific validation rules.

To do so, add the `->rulesFor()` on your field and the `HandlesTranslatable` trait to your Nova resource.

`->rulesFor` accepts `array|string|callable` locales and `array|callable` rules.

```php
use KraenkVisuell\NovaAstrotranslatable\HandlesTranslatable;

class Product extends Resource
{
    use HandlesTranslatable;

    public function fields(Request $request)
    {
        return [
            Text::make(__('Name'), 'name')
                ->sortable()
                ->translatable()
                ->rules(['max:255'])
                ->rulesFor('en', [
                    'required',
                ])
                ->rulesFor(['en', 'et'], function ($locale) {
                    return ["unique:products,name->$locale{{resourceId}}"];
                }),
        ];
    }
}
```
#### In this example, rules will be added to the following values
```dotenv
max: name.*
required: name.en
unique: name.en & name.et
```

## Configuration

You can define default locales for all the `translatable` fields in the config file. The config file can be published using:

```bash
php artisan vendor:publish --tag="nova-translatable-config"
```

## Credits

- [Kraenk Visuell GbR](https://github.com/kraenkvisuell)
- [Ytrade Group AB](https://github.com/yaytrade)
- [Tarvo Reinpalu](https://github.com/Tarpsvo)
- [Optimist Digital](https://github.com/optimistdigital)

## License

This project is open-sourced software licensed under the [MIT license](LICENSE.md).
