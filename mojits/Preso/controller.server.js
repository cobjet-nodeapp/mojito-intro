// Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
// Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
YUI.add('Preso', function(Y, NAME)
{
    Y.mojito.controllers[NAME] =
    {
        init: function(config)
        {
            this.config = config;
        },
        
        index: function(ac)
        {
            var self = this,
                slides = self.config.slides,
                numSlides = slides.length,
                // slide can come from routes or query params so get from merged
                currentSlide = parseInt(ac.params.merged('slide') || '1', 10),
                children = null;
            
            // store slide info
            self.currentSlide = currentSlide;
            self.prevSlide = currentSlide > 1 ? currentSlide - 1 : numSlides;
            self.nextSlide = currentSlide < numSlides ? currentSlide + 1 : 1;
            
            // store config for access in binder
            ac.instance.config.numSlides = numSlides;
            
            // store ac for access in other methods
            self.ac = ac;
            
            // workaround for an arbitrary view
            self.populateView('index', slides[currentSlide - 1]);
            
            // end execution
            self.ac.done({nav: self.genNav()});
        },
        
        // attach an arbitrary view
        populateView: function(target, slidePath)
        {
            var self = this,
                views = self.ac.command.instance.views
            
            views[target]['content-path'] = slidePath;
        },
        
        genNav: function()
        {
            var self = this;
            
            return [
            '<nav>',
                '<a href="/' + self.prevSlide + '" data-slide="' + self.prevSlide + '" title="Previous Slide" class="prev">&lt;</a>',
                '<a href="/' + self.currentSlide + '" data-slide="' + self.currentSlide + '" title="Current Slide" class="current">#</a>',
                '<a href="/' + self.nextSlide + '" data-slide="' + self.nextSlide + '" title="Next Slide" class="next">&gt;</a>',
            '</nav>'
            ].join(' ');
        }
    };
}, '0.0.1', {requires: ['json', 'mojito']});
