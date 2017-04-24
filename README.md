# iframe
JQuery plugin to help integrate staffino frame to your website

## How to use:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Staffino iframe - basic integration</title>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="staffino-iframe.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#staffino-iframe-container').staffino({
                venue: 'd6ddb4d9ac634a9a9ec2280ea6b20ee5'
            });
        });
    </script>
    <style>
        html, body {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div id="staffino-iframe-container"></div>
</body>
</html>
```

For more usage samples see the `examples` directory.
