insert into TENJIN_PROVIDER (PROVIDER_ID, TITLE, DESCRIPTION, BEAN_NAME) values (2, 'PlagiarismPolicyProvider', 'Provider for plagiarism text', 'ca.hec.commons.providers.PlagiarismPolicyProvider');
insert into TENJIN_TEMPLATEELEMENT (TEMPLATEELEMENT_ID, TEMPLATEELEMENTTYPE_ID) VALUES (45, 2);
insert into TENJIN_TEMPLATEELEMENT_I18N (TEMPLATEELEMENT_ID, LABEL, LOCALE) VALUES (45, 'Plagiarism', 'en_US');
insert into TENJIN_TEMPLATEELEMENT_I18N (TEMPLATEELEMENT_ID, LABEL, LOCALE) VALUES (45, 'Plagiat', 'fr_CA');
UPDATE TENJIN_TEMPLATESTRUCTURE SET DISPLAY_ORDER = 1 WHERE PARENT_ID = 12 AND DISPLAY_ORDER = 0;
UPDATE TENJIN_TEMPLATESTRUCTURE SET DISPLAY_ORDER = 2 WHERE PARENT_ID = 12 AND DISPLAY_ORDER = 1;
UPDATE TENJIN_TEMPLATESTRUCTURE SET DISPLAY_ORDER = 3 WHERE PARENT_ID = 12 AND DISPLAY_ORDER = 2;
UPDATE TENJIN_TEMPLATESTRUCTURE SET DISPLAY_ORDER = 4 WHERE PARENT_ID = 12 AND DISPLAY_ORDER = 3;
UPDATE TENJIN_TEMPLATESTRUCTURE SET DISPLAY_ORDER = 5 WHERE PARENT_ID = 12 AND DISPLAY_ORDER = 4;
UPDATE TENJIN_TEMPLATESTRUCTURE SET DISPLAY_ORDER = 6 WHERE PARENT_ID = 12 AND DISPLAY_ORDER = 5;
insert into TENJIN_TEMPLATESTRUCTURE (TEMPLATESTRUCTURE_ID, MANDATORY, DISPLAY_IN_MENU, PARENT_ID, TEMPLATEELEMENT_ID, PROVIDER_ID, DISPLAY_ORDER) VALUES (693, 1, 0, 12, 45, 2, 0);
