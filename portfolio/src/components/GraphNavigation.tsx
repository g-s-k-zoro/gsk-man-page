import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import rough from 'roughjs/bundled/rough.esm';
import { GraphNode, GraphLink } from '../types';

interface GraphNavigationProps {
  nodes: GraphNode[];
  links: GraphLink[];
  onNodeHover: (node: GraphNode | null) => void;
  onNodeClick: (node: GraphNode) => void;
}

const GraphNavigation: React.FC<GraphNavigationProps> = ({
  nodes,
  links,
  onNodeHover,
  onNodeClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const { width, height } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create rough.js canvas
    const rc = rough.svg(svgRef.current);

    // Initialize nodes in a circular arrangement with MORE SPACING
    const savedPositions = JSON.parse(localStorage.getItem('nodePositions') || '{}');
    const radius = Math.min(width, height) * 0.38;
    
    // Arrange nodes in a circle with some organic variation
    nodes.forEach((node: any, i) => {
      if (!savedPositions[node.id]) {
        const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
        const variationRadius = radius + (Math.random() - 0.5) * 60;
        const angleVariation = (Math.random() - 0.5) * 0.15;
        
        node.x = centerX + variationRadius * Math.cos(angle + angleVariation);
        node.y = centerY + variationRadius * Math.sin(angle + angleVariation);
      } else {
        node.x = savedPositions[node.id].x;
        node.y = savedPositions[node.id].y;
      }
    });

    // Create force simulation with INCREASED DISTANCES
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links)
        .id((d: any) => d.id)
        .distance(220)
        .strength((d: any) => d.strength * 0.4))
      .force('charge', d3.forceManyBody()
        .strength(-800)
        .distanceMax(500))
      .force('center', d3.forceCenter(centerX, centerY).strength(0.05))
      .force('collision', d3.forceCollide()
        .radius((d: any) => getNodeRadius(d.size, d.id) + 35)
        .strength(0.9))
      .force('radial', d3.forceRadial(radius, centerX, centerY).strength(0.08));

    // Create container groups
    const g = svg.append('g');

    // Enable zoom and pan
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Draw links with curved paths
    const link = g.append('g')
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#4a5568')
      .attr('stroke-opacity', (d: any) => 0.3 + d.strength * 0.4)
      .attr('stroke-width', (d: any) => 1.5 + d.strength * 1.5);

    // Create node groups
    const nodeGroup = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('cursor', 'pointer');

    // Function to get node radius based on size and id
    function getNodeRadius(size: string, id?: string) {
      // Make nodes bigger for long text
      if (id === 'why_not_started' || id === 'waste_time') {
        return 55; // Larger for long text
      }
      switch (size) {
        case 'small': return 30;
        case 'medium': return 40;
        case 'large': return 50;
        default: return 40;
      }
    }

    // Add glow effect for nodes
    const defs = svg.append('defs');
    nodes.forEach((node: any) => {
      const filter = defs.append('filter')
        .attr('id', `glow-${node.id}`)
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');
      
      filter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');
      
      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    // Add hand-drawn circles for nodes
    nodeGroup.each(function(d: any) {
      const group = d3.select(this);
      const radius = getNodeRadius(d.size, d.id);
      
      // Create hand-drawn circle with rough.js
      const roughCircle = rc.circle(0, 0, radius * 2, {
        stroke: d.color,
        strokeWidth: 2,
        fill: d.color,
        fillStyle: 'solid',
        fillWeight: 0.1,
        roughness: 1.5,
      });

      group.node()?.appendChild(roughCircle);
    });

    // Function to wrap text for long titles
    function wrapText(text: d3.Selection<any, any, any, any>, width: number) {
      text.each(function(d: any) {
        const text = d3.select(this);
        const words = d.title.split(/\s+/);
        
        // Special handling for long titles
        if (d.id === 'why_not_started') {
          text.selectAll('*').remove();
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '-0.6em')
            .text("Why haven't I");
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '1.2em')
            .text("started yet?");
        } else if (d.id === 'waste_time') {
          text.selectAll('*').remove();
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '-0.6em')
            .text("It's better to");
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '1.2em')
            .text("waste time");
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '1.2em')
            .text("this way");
        } else {
          text.text(d.title);
        }
      });
    }

    // Add text labels with wrapping for long titles
    const labels = nodeGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', 'white')
      .attr('font-size', (d: any) => (d.id === 'why_not_started' || d.id === 'waste_time') ? '12px' : '14px')
      .attr('font-weight', '500')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .call(wrapText, 80);

    // Add hover and click interactions
    nodeGroup
      .on('mouseenter', function(event, d: any) {
        // Add hover effects
        d3.select(this)
          .transition()
          .duration(200)
          .attr('filter', `url(#glow-${d.id})`);
        
        // Highlight connected links
        link.transition().duration(200)
          .attr('stroke-opacity', (l: any) => 
            (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.1
          )
          .attr('stroke-width', (l: any) => 
            (l.source.id === d.id || l.target.id === d.id) ? 3 : 1
          );
        
        onNodeHover(d);
      })
      .on('mouseleave', function(event, d: any) {
        // Remove hover effects
        d3.select(this)
          .transition()
          .duration(200)
          .attr('filter', null);
        
        // Reset links
        link.transition().duration(200)
          .attr('stroke-opacity', (l: any) => 0.3 + l.strength * 0.4)
          .attr('stroke-width', (l: any) => 1.5 + l.strength * 1.5);
        
        onNodeHover(null);
      })
      .on('click', (event, d: any) => {
        event.stopPropagation();
        onNodeClick(d);
      });

    // Enable dragging
    const drag = d3.drag()
      .on('start', function(event, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', function(event, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', function(event, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        
        // Save position to localStorage
        const positions = JSON.parse(localStorage.getItem('nodePositions') || '{}');
        positions[d.id] = { x: d.x, y: d.y };
        localStorage.setItem('nodePositions', JSON.stringify(positions));
      });

    nodeGroup.call(drag as any);

    // Helper function to create curved path
    const linkArc = (d: any) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy) * 0.5;
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    };

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link.attr('d', linkArc);
      nodeGroup.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Run simulation for initial positioning
    simulation.alpha(0.5).restart();

    return () => {
      simulation.stop();
    };
  }, [nodes, links, dimensions, onNodeHover, onNodeClick]);

  return (
    <div className="w-full h-full relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
      />
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-muted text-sm glass-panel px-4 py-2 pointer-events-none">
        <p>Drag nodes to rearrange • Click to navigate</p>
        <p className="mt-1">Press <kbd className="px-2 py-1 bg-dark-border rounded text-xs">Ctrl+K</kbd> to search</p>
      </div>
      
      {/* Connection count indicator */}
      <div className="absolute top-4 left-4 text-muted text-xs glass-panel px-3 py-2 pointer-events-none">
        <p className="font-medium">Graph Connectivity</p>
        <p>Each node: 3-4 connections</p>
        <p>Total links: {links.length}</p>
      </div>
    </div>
  );
};

export default GraphNavigation;