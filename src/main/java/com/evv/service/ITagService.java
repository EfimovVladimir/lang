package com.evv.service;

import com.evv.model.Tag;

import java.util.List;

public interface ITagService {
  Tag getTagById(Integer id);
  List<Tag> findAllTags();
  void saveOrUpdateTag(Tag object);
  Integer save(Tag object);
  void deleteTag(Tag object);
}
