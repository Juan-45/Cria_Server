from typing import Dict, Any, List
from botocore.exceptions import ClientError
from flask import (
    jsonify,
)


def transform_query_response(
    response: List[Dict[str, Any]], uniqueIdKey: str
) -> Dict[str, Any]:
    result: Dict[str, Any] = {}
    # Iterate over response, list type
    for index, item in enumerate(response):
        # Exclude response's uniqueIdKey
        if item["sort_key"]["S"] != uniqueIdKey:
            reduced_list_by_sort_key: List[Dict[str, Any]] = []
            # Iterate over each response's item
            for key in item:
                # Exclude the sort_key and part_key keys
                excluded_keys = ["sort_key", "part_key"]
                if key not in excluded_keys:
                    reduced_item_dict: Dict[str, Any] = {}
                    # Iterate over each item of each sort_key's item ant Reduce it
                    for inner_key in item[key]["M"]:
                        reduced_item_dict[inner_key] = item[key]["M"][inner_key]["S"]
                    reduced_list_by_sort_key.append(reduced_item_dict)
            result[item["sort_key"]["S"]] = reduced_list_by_sort_key
        else:
            # uniqueIdKey
            result[uniqueIdKey] = item["id"]["S"]
        #
    return result
