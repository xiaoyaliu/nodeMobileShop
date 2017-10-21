 {{~ it.provinceList:item}}
                           <li {{? item.region_id==it.addressRs.province}}class="active"{{?}} data-id="{{=item.region_id}}">{{=item.region_name}}</li>
{{~}}