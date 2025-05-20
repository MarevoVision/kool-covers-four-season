import $ from 'jquery';
import './ArViewer.scss';
import ArViewerHTML from './ArViewer.html';

export function ArViewerComponent(container) {
    const componentContent = $('<div class="ar-container"></div>')

    $(componentContent).append(ArViewerHTML);

    $(container).append(componentContent);
}