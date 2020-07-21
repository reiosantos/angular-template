# Angular Template


## Module structure

    settings
    |---components/ (dumb components)
        |---category/(html,scss,spec,ts)
    |---containers (smart components)
        |---settings/(html,scss,spec,ts)
        |---categoryList/(html,scss,spec,ts)
    |---settings.facade.ts (contains abstractions to the business login in core modules)
    |---settings-routing.module.ts
    |---settings.module.ts
