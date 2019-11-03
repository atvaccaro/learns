'''
Testing out dbc with multipage
'''

import dash
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_html_components as html
import numpy as np
import pandas as pd
from flask import Flask, request, redirect

clients = ['a', 'b', 'c']

server = Flask('app')

app = dash.Dash(__name__, server=server, external_stylesheets=[dbc.themes.BOOTSTRAP])

navbar = dbc.NavbarSimple(
    children=[
        dcc.Location(id='url', refresh=False),
        dbc.DropdownMenu(
            nav=True,
            in_navbar=True,
            label='Menu',
            children=[dbc.DropdownMenuItem(dcc.Link(f'{client.upper()}', href=f'/{client}')) for client in clients]
        ),
    ],
    brand='Demo',
    brand_href='#',
    sticky='top',
)

body = dbc.Container(
    [
        html.Div(id='page-content')
    ]
)


app.layout = html.Div([navbar, body])


def load(client):
    return pd.DataFrame.from_dict(data={
        'a': np.random.randint(0, 10, 5),
        'b': np.random.randint(0, 10, 5),
        'c': np.random.randint(0, 10, 5),
    })


def series_to_tr(i, series):
    return html.Tr(
        children=[html.Td(
            dcc.Input(
                value=value,
                type='text',
                name=f'inp-{name}-{i}',
            )
        ) for name, value in series.iteritems()]
    )


@server.route('/submit', methods=['POST'])
def submit():
    print(request.form)
    return redirect('/')


@app.callback(dash.dependencies.Output('page-content', 'children'),
              [dash.dependencies.Input('url', 'pathname')])
def display_page(pathname):
    df = load(pathname)
    return html.Div([
        html.H3('You are on page {}'.format(pathname)),
        dbc.Row([
            html.Form(
                children=[html.Table(
                    children=[series_to_tr(i, row) for i, row in df.iterrows()]
                ),
                    html.Button(
                        children='Submit',
                        type='submit',
                    ),
                ],
                id='form',
                method='POST',
                action='/submit',
            ),
        ])
    ])


if __name__ == '__main__':
    app.run_server(debug=True)
